const {Router} =require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const {adminAuth} =require('../middleware/auth');
const bcrypt=require("bcrypt");
const { adminmodel, coursemodel } = require("../schema/admin");

require("dotenv").config();
JWT_ADMIN=process.env.JWT_SECREAT_ADMIN;

adminRouter.post("/login",async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    
    try{    
        const admin=await adminmodel.findOne({email:email});
        if(!admin){
            res.json({message:"user dosent exits"});
            return;
        }
        const passcomp=bcrypt.compare(password,admin.password);

        if(passcomp){
            const token=jwt.sign({
                admin:admin._id.toString(),
            },JWT_ADMIN);
            res.status(200).json({message:"user logged in!",token:token});
        }else{
            throw new Error("incorrect email or password");
        }
    }catch(err){
        res.status(403).json({message:err});
    }
})

adminRouter.post("/signup",async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    const hashpass=await bcrypt.hash(password,5);

    try{
        const already=await adminmodel.findOne({
            email:email
        })
        if(already){
            res.json({message:"user already exits"});
            return;
        }

        await adminmodel.create({
            email:email,
            password:hashpass,
            name:name
        })
    }catch(err){
        console.log("error in admin signup",err);
        res.json({message:"user already exits"});
    }
    res.status(200).json({message:"user signup success"});
})

adminRouter.post("/course",adminAuth,async (req,res)=>{
        const admin=req.admin;
        const title=req.body.title;
        const price=req.body.price;
        const duration=req.body.duration;

        try{
            const course=await coursemodel.create({
                title:title,
                duration:duration,
                price:price,
                createdby:admin
            })
            res.status(200).json({message:"course created success!",course:course});
        }catch(err){
            res.json({message:"error in created course"});
        }
        
})

adminRouter.delete("/course",adminAuth,async (req,res)=>{
        const title=req.body.title;
        const admin=req.admin;

        try{
            const creater=await coursemodel.findOneAndDelete({title:title});
            if(!(creater.createdby == admin)){
                throw new Error("owner only can delete!");
            }
        }catch(err){
            res.status(403).json({message:err});
        }
        res.status(200).json({message:'deleted successfully!'});
})

adminRouter.get("/content",adminAuth,async (req,res)=>{
    const admin=req.admin;
    let courses;
    try{
        courses=await coursemodel.find({createdby:admin});
        if(!courses){
            throw new Error("admin doesnt add any course");
        }
    }catch(err){
        res.status(403).json({message:err});
    }
    res.status(200).json({message:"course are shown",courses:courses});
})

module.exports={
    adminRouter
}