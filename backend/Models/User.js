const  mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique: true,
    },
    password:{// it didn't come to my mind
        type:String,
        required:true,
        minLength: 6,
    },
    contactnumber:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    movie:{
        type:String,
    },
    bookingstatus:{
        type:Boolean
    },
    slot:{
        type:Number,//in 1,2,3,4
    }
})

const User = mongoose.model('User', userSchema);
module.exports =  User;
