const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const Admin=new Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},

})

const Course=new Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    duration:{type:Number,required:true},
    createdby:{type:ObjectId,ref:'admins'}
})

const adminmodel=mongoose.model("admins",Admin);
const coursemodel=mongoose.model("courses",Course);

module.exports={
    adminmodel,coursemodel
}