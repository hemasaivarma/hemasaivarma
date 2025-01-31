const {Router}=require("express");
const courseRouter=Router();

const jwt=require("jsonwebtoken");
const {userAuth}=require("../middleware/auth");
const {purchasemodel} =require("../schema/user");

courseRouter.post("/purchase",userAuth,async (req,res)=>{
    const userid=req.user;
    const courseid=req.body.courseid;
    console.log(userid);

    try{
        if(!courseid){
            res.status(403).json({message:"provide course id"});
            throw new Error("enter course id");
        }
        const already=await purchasemodel.findOne({
            userid:userid,
            courseid:courseid,
        })
        if(already){
            res.json({message:"already purchased course!"});
            return;
        }

       const purchased= await purchasemodel.create({
            userid:userid,
            courseid:courseid
        })
        res.status(200).json({message:"purchased successfully!",course:purchased});
    }catch(err){
        res.status(403).json({message:'something went wrong',err});
    }
    
    
})

courseRouter.get("/courses",userAuth,async (req,res)=>{
    const userid=req.user;
    try{
        const courses=await purchasemodel.find({userid:userid});
        res.status(200).json({message:"fetched all courses",courses:courses})
    }catch(err){
        res.status(403).json({message:"invalid user"});
    }
})

module.exports={
    courseRouter
}
