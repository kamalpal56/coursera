const jwt=require("jsonwebtoken")
const JWT="jsontoken"

function adminmiddleware(req,res,next){
 const token=req.headers.token
 try{
 const check=jwt.verify(token,JWT)
 req.adminid=check.id
 next();
 }
 catch(error){
    return res.status(403).json({
        message: "You are not Signed in!", // Inform the user that they are not authorized
    });
 }
}
module.exports={
    adminmiddleware
}