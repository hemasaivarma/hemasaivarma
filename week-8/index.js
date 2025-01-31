const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const {userRouter} =require("./routes/userroutes");
const {adminRouter}=require("./routes/adminroute");
const {courseRouter}=require("./routes/courseroute");

mongoose.connect(process.env.connection);

const app=express();
app.use(express.json());


app.use("/index/user",userRouter);
app.use("/index/admin",adminRouter)
app.use("/index/course",courseRouter);



app.listen(3000,()=>{
    console.log("server is starting..");
});
    
    







