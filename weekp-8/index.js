const mongoose=require("mongoose");
const express=require("express");
require("dotenv").config();

mongoose.connect(process.env.connection);
const app=express();

const {userRouter}= require("./Routes/userRoute");
const {adminRouter} =require("./Routes/adminRoute");

app.use(express.json());

app.use("/users/",userRouter);
app.use("/admins/",adminRouter);

app.listen(3000,()=>{
    console.log("server is running");
})
