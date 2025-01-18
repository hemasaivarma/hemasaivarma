const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
const JWT_SECRET="qwerty123";

app.use(express.json());

let users=[];

app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username: username,
        password:password
    });

    res.status(200).json({
        message:"sign up successfully"
    })
});

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let userfound=null;

    userfound=users.find(function(e){
        return (e.username === username) && (e.password === password);
    })

    if(userfound){
        const token = jwt.sign({username},JWT_SECRET);
        res.status(200).json({token : token});
    }else{
        res.status(404).json({message:"invalid credentials"});
    }
})


app.get("/me",function(req,res){
    const token =req.headers.token;

    const username1=jwt.verify(token,JWT_SECRET);

    const user=users.find(function(e){
        return (e.username == username1.username);
    }) 

    if(user){
        res.status(200).json({
            username:user.username,
            password:user.password
        })
    }else{
        res.status(404).send({
            message:"token invalid"
        })
    }
})


app.listen(3000);