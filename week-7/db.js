const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    email:{type:String,unique:true},
    name:String,
    password:String,
}) 

const Todo=new Schema({
    title:String,
    isDone:Boolean,
    userId:ObjectId,
})

const Usermodel=mongoose.model("users",User);
const Todomodel=mongoose.model("todos",Todo);

module.exports={
    Usermodel,Todomodel,
}
