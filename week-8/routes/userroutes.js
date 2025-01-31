const {Router} =require("express");
const {usermodel} =require("../schema/user");


const  jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

require("dotenv").config();
JWT_SEREAT=process.env.JWT_SECREAT;
const userRouter=Router();

userRouter.post("/signup",async (req,res)=>{
    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;   

    const hashpass=await bcrypt.hash(password,5);

    try{
        await usermodel.create({
            email:email,
            name:name,
            password:hashpass
        })
    }catch(err){
        res.status(403).json({message:"user already exits"});
    }
    res.status(200).json({message:"user signed succesfully!"});
})

userRouter.post("/login",async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const user=await usermodel.findOne({
        email:email
    })
    if(!user){
        res.status(403).json({message:"user not found"});
        return;
    }

    const comparedpass=bcrypt.compare(password,user.password);
    if(comparedpass){
        const token=jwt.sign({
            user:user._id.toString(),
        },JWT_SEREAT);
        res.status(200).json({message:"you logged in!",token:token});
    }else{
        res.status(403).json({message:"invalid creaditials"});
    }

    })


module.exports={
    userRouter
}