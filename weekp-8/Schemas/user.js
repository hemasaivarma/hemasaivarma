const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

const Purchase=new Schema({
    courseid:[{type:ObjectId,ref:'courses'}],
    userid:{type:String,ref:'users'}
})

const usermodel=mongoose.model("users",User);
const purchasemodel=mongoose.model("purchases",Purchase);

module.exports={
    usermodel,purchasemodel
}