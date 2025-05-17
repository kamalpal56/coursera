const {Router}=require("express")
const courseRouter=Router()
const {usermiddleware}=require("../middleware/user");
const { courseModel, purchasemodel } = require("../db");
courseRouter.post("/purchase",usermiddleware,async function(req,res){
    const userid=req.userid
    const courseid=req.body.courseId
    if(!courseid){
        return res.status(400).json({
            message: "Please provide a courseId", // Error message sent back to the client
        });
    }
    const existingpurchase=await purchasemodel.findOne({
        courseId:courseid,
        userId:userid
    })
    if (existingpurchase) {
        return res.status(400).json({
            message: "You have already bought this course",
        });
    }
    await purchasemodel.create({
        courseId:courseid,
        userId:userid
    })
    return res.status(200).json({
        message: "You have success purchase this course",
    });
});
courseRouter.get("/preview",async function(req,res){

    const courses=await courseModel.find({});

   // Return the queried course details as a JSON response to the client with a 200 status code
    res.status(200).json({
        courses: courses, // Send the course details back to the client
    });
});

module.exports={
    courseRouter:courseRouter,
};