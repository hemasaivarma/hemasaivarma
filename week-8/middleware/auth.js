const jwt=require("jsonwebtoken");
require("dotenv").config();

JWT_SEREAT=process.env.JWT_SECREAT;
JWT_ADMIN=process.env.JWT_SECREAT_ADMIN;

const userAuth=(req,res,next)=>{
    const userId=req.headers.token;
    try{
        const userid=jwt.verify(userId,JWT_SEREAT);

    if(userid){
        req.user=userid.id;
        next();
    }
    }catch(err){
        res.status(403).json({message:"invalid user"});
    }
}
const adminAuth=(req,res,next)=>{
    const token=req.headers.token;

    try{
        const adminId=jwt.verify(token,JWT_ADMIN);
        if(adminId){
            req.admin=adminId.id;
            next();
        }
    }catch(err){
        res.status(403).json({message:"admin creaditials invalid!"});
    }
} 
module.exports={
    userAuth,adminAuth
}