const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

})

const Purchase=new Schema({
    courseid:[{type:ObjectId,required:true,ref:'Course'}],
    userid:{type:ObjectId,required:true}
})

const usermodel=mongoose.model("users",User);
const purchasemodel=mongoose.model("purchases",Purchase);

module.exports={
    usermodel,purchasemodel
}