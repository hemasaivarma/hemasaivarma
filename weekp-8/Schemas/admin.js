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
    createdby:{type:ObjectId,ref:'admins'}
})

const adminmodel=mongoose.model("admins",Admin);
const coursemodel=mongoose.model("courses",Course);

module.exports={adminmodel,coursemodel};