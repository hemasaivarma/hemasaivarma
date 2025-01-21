let {Usermodel,Todomodel} = require("../db.js");
const mongoose=require("mongoose");
const express=require("express");
const jwt=require("jsonwebtoken");
const {z}=require("zod");
const bcrypt=require("bcrypt");
const app=express();

app.use(express.json());

const JWT_SECREAT="Hemasai@123";

mongoose.connect("mongodb+srv://hemasai:-a%40-T2Zgbd5CVLx@cluster0.z5ilu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todos-practice");

app.post("/signup",async (req,res)=>{
    const requiredbody= z.object({
        email:z.string().min(3).max(30).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(8).max(100).regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d).{8,100}$/)
    })
    
    const parseDatawithvalidity=requiredbody.safeParse(req.body);
    
   if(!parseDatawithvalidity.success){
    return res.json({
        messsage:"incorrect data format",
        error:parseDatawithvalidity.error,
    })
   }
   const email=req.body.email;
   const name=req.body.name;
   const password=req.body.password;
   const hashpass=await bcrypt.hash(password,5);

   let toggle=true;
   try{
     await Usermodel.create({
        email:email,
        password:hashpass,
        name:name
     })
   }catch(err){
    res.status(403).json({message:"user already exits"});
    toggle=false;
   }
   if(toggle){
    res.status(200).json({message:"user sign up"});
   }
})

app.post("/signin",async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

        const user=await Usermodel.findOne({
            email:email,
        })

        if (!user) {
            return res.status(403).json({
                message: "Invalid Credentials!",
            });
        }

        const passmatch=bcrypt.compare(password,user.password);

        if(passmatch){
            const token=jwt.sign({
                id:user._id.toString(),
            },JWT_SECREAT);
            res.status(200).json({message :"user sign in",token:token});
        }else{
            res.status(403).json({message:"invalid creadentials"});
        }
    
    
})


const Auth=(req,res,next)=>{
    const token=req.headers.token;

    try{
        const userId=jwt.verify(token,JWT_SECREAT);
        
        if(userId){
            req.userId=userId.id;
            next();
        }

    }catch(err){
        res.status(403).json({message:"invalid user"});
    }

}

app.post("/todo",Auth,async (req,res)=>{
    const userId=req.userId;
    const title=req.body.title;
    const isDone=req.body.isDone;
    let toggle=true;
    try{
        await Todomodel.create({
            title:title,
            isDone:isDone,
            userId:userId,
        })

    }catch(err){
        res.status(403).json({message:"invalid todos"});
        console.log("error in todo",err);
        toggle=false;
    }
    if(toggle){
        res.status(200).json({message:"todo created"});
    }

})

app.get("/todos",Auth,async (req,res)=>{
    const userId=req.userId;

        const todos=await Todomodel.find({
            userId,
        });
   
        if(todos){
            res.status(200).json({todos,});
        }else{
            res.status(403).json({message:"error in todos"});
        }
   
})


app.listen(3000);
