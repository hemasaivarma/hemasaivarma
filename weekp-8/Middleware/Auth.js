const {usermodel}=require("../Schemas/user");
const {adminmodel}=require("../Schemas/admin");

const jwt=require("jsonwebtoken");
require("dotenv").config();

const JWT_USER=process.env.JWT_USER;
const userAuth=(req,res,next)=>{
const token=req.headers.token;

const usertoken=jwt.verify({
    user:token
})

try{
    if(!user){
        throw new Error("user is not logged in!");
    }
    req.user=usertoken.user;
}catch(err){
    res.status(403).json("error in user auth");
}

}

module.exports={userAuth}