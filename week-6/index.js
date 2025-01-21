const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
const JWT_SECRET="qwerty123";

app.use(express.json());

let users=[];

function Auth(req,res,next){
    const token =req.headers.token;
    try{
        const deecoded=jwt.verify(token,JWT_SECRET);
    if(deecoded.username){
        req.username=deecoded.username;
        next();
    }else{
        res.json({
            message:"you are not logged in!"
})
    }
    }catch(err){
        res.status(404).json({message:"failed authenticate token"});
    }
    
}

function logger(req,res,next){
    console.log(`${req.method} is used`);
    next();
}

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

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

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


app.get("/me",Auth,function(req,res){

    const user=users.find(function(e){
        return (e.username === req.username);
    }) 

  
        res.status(200).json({
            username:user.username,
            password:user.password
        })
})


app.listen(3000);