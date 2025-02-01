const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

const Purchase=new Schema({
    courseid:[{type:ObjectId,ref:'courses1'}],
    userid:{type:ObjectId,ref:'users1'}
})

const usermodel=mongoose.model("users1",User);
const purchasemodel=mongoose.model("purchases1",Purchase);

module.exports={
    usermodel,purchasemodel
}