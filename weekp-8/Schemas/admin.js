const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const Admin=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

const Course=new Schema({
    title:String,
    descrition:String,
    price:Number,
    createdby:{type:ObjectId,ref:'admins1'}
})

const adminmodel=mongoose.model("admins1",Admin);
const coursemodel=mongoose.model("courses1",Course);

module.exports={adminmodel,coursemodel};