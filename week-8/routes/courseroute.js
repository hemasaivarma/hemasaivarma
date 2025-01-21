const {Router}=require("express");
const courseRouter=Router();

const {userAuth}=require("../middleware/auth");
const {purchasemodel} =require("../schema/user");

courseRouter.get("/purchase",userAuth,async (req,res)=>{
    const userid=req.user;
    const courseid=req.body.courseid;

    if(!courseid){
        res.status(403).json({message:"provide course id"});
    }

    try{
        const already=await purchasemodel.findOne({
            userid:userid,
            courseid:courseid,
        })
        if(!already){
            res.json({message:"already purchased course!"});
            return;
        }

       const purchased= await purchasemodel.create({
            userid:userid,
            courseid:courseid
        })
    }catch(err){
        res.status(403).json({message:'something went wrong'});
    }
    res.status(200).json({message:"purchased successfully!",course:purchased});
})

courseRouter.get("/courses",userAuth,async (req,res)=>{
    const userid=req.user;
    try{
        const courses=await purchasemodel.find({userid:userid});
        res.status(200).json({message:"fetched all courses",courses:courses.courseid})
    }catch(err){
        res.status(403).json({message:"invalid user"});
    }
})

module.exports={
    courseRouter:courseRouter
}
