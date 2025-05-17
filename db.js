const mongoose=require("mongoose")
const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId
const userSchema=new Schema({
    email:{type:String , unique: true},
    firstname:String,
    lastname:String,
    password:String
})
const adminSchema=new Schema({
    email:{type:String , unique: true},
    firstname:String,
    lastname:String,
    password:String
})
const courseSchema=new Schema({
    title:{ type: String, unique: true},
    discription:String,
    price:Number,
    imageUrl: String,
    createrId:ObjectId

})
const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const userModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const courseModel= mongoose.model("course",courseSchema)
const purchasemodel=mongoose.model("purchase",purchaseSchema)

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchasemodel
}