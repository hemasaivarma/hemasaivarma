const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const {userRouter} =require("./routes/userroutes");
const {adminRouter}=require("./routes/adminroute");
const {courseRouter}=require("./routes/courseroute");

const app=express();
app.use(express.json());


app.use("/user",userRouter);
app.use("/admin",adminRouter)
app.use("/course",courseRouter);


function main(){
    console.log("server connection started");
    mongoose.connect(process.env.connection);
    app.listen(3000);
}






