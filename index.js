const express=require("express")
const app=express()
const mongoose=require("mongoose")
const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter}=require("./routes/admin")
app.use(express.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)

async function main(){
    await mongoose.connect("mongodb+srv://kamalpal1056:Kamal1056@cluster0.xrxt2qp.mongodb.net/coursera_database");
    console.log("connected !")
    app.listen(3000)
}
main()