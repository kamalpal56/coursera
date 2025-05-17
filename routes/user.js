const {Router}=require("express")
const userRouter=Router();
const jwt=require("jsonwebtoken")
const zod=require("zod");
const { userModel, purchasemodel,courseModel } = require("../db");
const {usermiddleware}=require("../middleware/user")
const {adminmiddleware}=require("../middleware/admin")
const bcrypt=require("bcrypt")
const JWT="jsontoken"
userRouter.post("/signup", async function(req,res){
    const requirebody = zod.object({
        email: zod.string().email().min(5), // Email must be a valid format and at least 5 characters
        password: zod.string().min(5), // Password must be at least 5 characters
        firstName: zod.string().min(3), // First name must be at least 3 characters
        lastName: zod.string().min(3), // Last name must be at least 3 characters
    });
    const parsedata=requirebody.safeParse(req.body)
    if(!parsedata.success){
        res.json({
            message:"incorrect data format",
            error:parsedata.error,
        })
    }
    const {email,firstname,lastname,password}=req.body
    const hashpassword=await bcrypt.hash(password,10)
    try{
    userModel.create({
        email:email,
        firstname:firstname,
        lastname:lastname,
        password:hashpassword
    });
}catch(error){
    return res.status(400).json({
        message: "You are already signup!",
    });
}
    
    res.json({
        message:"signup endpoint"
    })
});
userRouter.post("/signin", async function(req,res){


    const requireBody = zod.object({
            email: zod.string().email().min(5), // Email must be a valid format and at least 5 characters
            password: zod.string().min(5), // Password must be at least 5 characters
        });
        const parsedata=requireBody.safeParse(req.body)
        if(!parsedata.success){
            res.json({
                message:"incorrect data format",
                error:parsedata.error,
            })
        }
        const {email, password}=req.body
        const admin=await userModel.findOne({
            email:email
        })
        if(!admin){
            return res.status(403).json({
                message: "Invalid Credentials!",
            });
        }
    
        const passwordmatch=await bcrypt.compare(password,admin.password)
    
        if(passwordmatch){
            const token=jwt.sign({id:admin._id},JWT)
            res.json({
                token:token
            });
        }
        else{
            res.status(403).json({
                message: "Invalid Credentials!",
            });
        }

});
userRouter.get("/purchases",usermiddleware, async function(req,res){

  const userid=req.userid

  const purchases=await purchasemodel.find({
    userId:userid,
  })
  if(!purchases){
    return res.status(404).json({
        message:"No purchase found",
    })
  }
  // If purchases are found, extract the courseIds from the found purchases
  const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);
  // Find all course details associated with the courseIds
  const coursesData = await courseModel.find({
    _id: { $in: purchasesCourseIds }, // Querying courses using the extracted course IDs
});

     // Send the purchases and corresponding course details back to the client
     res.status(200).json({
        purchases, // Include purchase data in the response
        coursesData, // Include course details in the response
    });
});

module.exports={
    userRouter:userRouter
};