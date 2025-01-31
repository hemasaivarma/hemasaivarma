const {Router} =require("express");
const userRouter=Router();

require("dotenv").config();
const JWT_USER=process.env.JWT_USER;

const {userAuth}=require("../Middleware/Auth");
const {usermodel, purchasemodel}=require("../Schemas/user");
const {coursemodel}=require("../Schemas/admin");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

userRouter.post("signup",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const hashpass=await bcrypt.hash(password,5);
    try{
        await usermodel.create({
            username:username,
            password:hashpass
        });
        res.status(200).json({msg:"signup successfully"});

    }catch(err){
        res.status(400).json({msg:"error in signup!"});    
    }

})

userRouter.post("login",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const user=await usermodel.findOne({
        username:username
    });
     
    try{
        if(!user){
            throw new Error("username is not register");
        }
        const comparepass=bcrypt.compare(password,user.password);

        if(!comparepass){
            throw new Error("invalid creditionals");
        }

        const token=jwt.sign({
            user:user._id.toString(),
        },JWT_USER);
        res.status(200).json({msg:"success of login",token:token});
    }catch(err){
        res.status(403).json({msg:"error in signup",error:err});
    }
})

userRouter.get("courses",userAuth,async (req,res)=>{
     try{
        const course=await coursemodel.find({});
        res.status(200).json({msg:"here are courses",courses:course});
    }catch(err){
        res.status(403).json({msg:"error in fetching data"});
    }
})

userRouter.post("courses/:courseid",userAuth,async (req,res)=>{
    const user=req.user;
    const courseid=req.body.courseid;

    try{
        if(!user){
            throw new Error("user not found!");
        }
        const course=await coursemodel.findOne({courseid:courseid});

        if(!course){
            throw new Error("course not found!");
        }
        const ispurchased=await purchasemodel.findOne({
            userid:user,
        })
        if(ispurchased){
            ispurchased.courseid.push(courseid);
        }else{
            await purchasemodel.create({
                userid:user,
                courseid:courseid
            })
        }

        res.status(200).json({msg:"course purchased successfully"});
    }catch(err){
        res.status(403).json({msg:"error in purchase",error:err});
    }
})


userRouter.get("purchasedCourses",userAuth,async (req,res)=>{
    const user=req.user;

    try{
        const purchased=await purchasemodel.find({userid :user})
        if (!purchased){
            throw new Error("you dont purchased anything");
        }
        res.status(200).json({purchased:purchased.courseid});
    }catch(err){
        res.status(403).json({msg:"error in fetching purchased data"});
    }
})

module.exports={userRouter};
