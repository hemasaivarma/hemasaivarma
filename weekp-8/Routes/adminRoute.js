const {Router}=require("express");
const adminRouter=Router();
const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken");

const {adminmodel,coursemodel} =require("../Schemas/admin");
const {adminAuth}=require("../Middleware/Auth");

const JWT_ADMIN=process.env.JWT_ADMIN;

adminRouter.post("/signup", async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const hashpass=await bcrypt.hash(password,5); 
    try{

        await adminmodel.create({
            username :username,
            password:hashpass
        })
        res.status(200).json({msg:"signup succses!"})
    }catch(err){
        res.status(403).json({msg:"error in signup"})
    }
})

adminRouter.post("/login",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    try{
        const admin=await adminmodel.findOne({
            username:username
        })
        if(!admin){
            throw new Error("admin doesnt exists");
        }
        const comparepass=bcrypt.compare(password,admin.password);

        if(!comparepass){
            throw new Error("password is incorrect");
        };

        const token=jwt.sign({
            admin:admin._id.toString()
        },JWT_ADMIN);

        res.status(200).json({msg:"login success",token:token});
    }catch(err){
        res.status(403).json({msg:"invalid username or password"+err});
    }
})  

adminRouter.post("/courses",adminAuth, async (req,res)=>{
    const admin=req.admin;
    const title=req.body.title;
    const descrition=req.body.descrition;
    const price=req.body.price;

    try{
      const course=await coursemodel.create({
        title:title,
        descrition:descrition,
        price:price,
        createdby:admin
      })
      res.status(200).json({msg:"course is created!",course:course});
    }catch(err){
        res.status(403).json({msg:"error in creating course "});
    }
})

adminRouter.get("/courses",async (req,res)=>{
    const admin=req.admin;
    const temp=[];
    try{
        const course=await coursemodel.find({
            createdby:admin
        })
        if(course ===temp){
            throw new Error("admin doesnt created any courses");
        }

        res.status(200).json({msg:"fetched all courses",course:course});
    }catch(err){
        res.status(403).json({msg:"error fetching courses",err});
    }
})

module.exports={adminRouter}