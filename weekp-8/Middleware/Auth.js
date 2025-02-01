const {usermodel}=require("../Schemas/user");
const {adminmodel}=require("../Schemas/admin");

const jwt=require("jsonwebtoken");
require("dotenv").config();

const JWT_USER=process.env.JWT_USER;
const JWT_ADMIN=process.env.JWT_ADMIN;

const userAuth=(req,res,next)=>{
const token=req.headers.token;

const usertoken=jwt.verify(token,JWT_USER)

try{
    if(!usertoken){
        throw new Error("user is not logged in!");
    }
    req.user=usertoken.user;
    next();
}catch(err){
    console.log("error in userAuth",err);
}}

const adminAuth=(req,res,next)=>{
    const token=req.headers.token;

    const admintoken=jwt.verify(token,JWT_ADMIN);

    try{
        if(!admintoken){
            throw new Error("provide valid token");
        }
        req.admin=admintoken.admin;
        next();
    
    }catch(err){
        console.log("error in adminauth",err);
    }
}
module.exports={userAuth,adminAuth}