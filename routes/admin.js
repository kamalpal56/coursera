const { Router, json } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const zod=require("zod")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { adminmiddleware } = require("../middleware/admin");
const course = require("./course");
const JWT="jsontoken"

adminRouter.post("/signup", async function (req, res) {
    
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
    adminModel.create({
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
    message: "Signup endpoint",
});
});

// Define the admin routes for signin 
adminRouter.post("/signin", async function (req, res) {
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
    const admin=await adminModel.findOne({
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

// Define the admin routes for creating a course 
adminRouter.post("/course", adminmiddleware, async function (req, res) {
    const adminid=req.adminid
    const requireBody = zod.object({
        title: zod.string().min(3), // Title must be at least 3 characters
        discription: zod.string().min(10), // Description must be at least 10 characters
        imageUrl: zod.string().url(), // Image URL must be a valid URL
        price: zod.number().positive(), // Price must be a positive number
    });
    const parsedata=requireBody.safeParse(req.body)
    if(!parsedata.success){
        res.json({
            message:"incorrect data format",
            error:parsedata.error,
        })
    }


    const {title,discription,imageUrl,price}=req.body
    const course=await courseModel.create({
        title,
        discription,
        price,
        imageUrl,
        createrId:adminid
    })
    res.status(201).json({
        message: "Course created!",
        courseId: course._id,
    });
});

// Define the admin routes for updating a course
adminRouter.put("/course", adminmiddleware, async function (req, res) {
    const adminid=req.adminid
    
    const requireBody = zod.object({
        courseId: zod.string().min(5), // Ensure course ID is at least 5 characters
        title: zod.string().min(3), // Title must be at least 3 characters
        discription: zod.string().min(10), // Description must be at least 10 characters
        imageUrl: zod.string().url(), // Image URL must be a valid URL
        price: zod.number().positive(), // Price must be a positive number
    });
    const parsedata=requireBody.safeParse(req.body)
    if(!parsedata.success){
        res.json({
            message:"incorrect data format",
            error:parsedata.error,
        })
    }
    const {courseId,title,discription,price,imageUrl}=req.body
    console.log(adminid)
    const course=await courseModel.findOne({
        _id: courseId, // Match the course by ID
        createrId: adminid, // Ensure the admin is the creator
    })
    if(!course){
        return res.status(404).json({
            message: "Course not found!", // Inform the client that the specified course does not exist
        });
    }

    await courseModel.updateOne({
        _id: courseId, // Match the course by ID
            createrId: adminid, // Ensure the admin is the creator
    },{
        title: title || course.title, // Update title if provided, otherwise keep the existing title
            discription: discription || course.discription, // Update description if provided, otherwise keep the existing description
            imageUrl: imageUrl || course.imageUrl, // Update imageUrl if provided, otherwise keep the existing imageUrl
            price: price || course.price, // Update price if provided, otherwise keep the existing price
    })

    res.status(201).json({
        message: "Course created!",
        courseId: course._id,
    });

});

// Define the admin routes for getting all courses
adminRouter.get("/course/bulk", adminmiddleware, async function (req, res) {
    const adminid=req.adminid
    const courses=await courseModel.find({
        createrId:adminid,
    })

    res.status(200).json({
        courses: courses,
    });

});

// Export the adminRouter so that it can be used in other files
module.exports = {
    adminRouter: adminRouter,
};