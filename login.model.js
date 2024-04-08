const mongoose= require('mongoose');
const Schema=mongoose.Schema;

let New_user1=new Schema({
    Username:{type:String},
    Password:{type:String},
});

module.exports=mongoose.model("login_data",New_user1);