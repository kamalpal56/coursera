const jwt=require("jsonwebtoken")
const JWT="jsontoken"

function usermiddleware(req,res,next){
 const token=req.headers.token
 try{
 const check=jwt.verify(token,JWT)
 req.userid=check.id
 next();
 }
 catch(error){
    return res.status(403).json({
        message: "You are not Signed in!", // Inform the user that they are not authorized
    });
 }
}
module.exports={
    usermiddleware
}