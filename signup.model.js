const mongoose= require('mongoose');
const Schema=mongoose.Schema;

let New_user=new Schema({
 Username:{type:String},
 Email:{type:String},
 Mobileno:{type:Number},
 Password:{type:String},
});

module.exports=mongoose.model("signup_data",New_user);