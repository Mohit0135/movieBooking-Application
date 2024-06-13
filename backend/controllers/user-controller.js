const UserModel = require ('../models/User');

exports.getAllUsers = async (req,res,next) => {
    let users;
    try {
        users = await UserModel.find();
    }catch(error){
        console.log(error)
        return res.status(500);
    }
    if(!users){
        return res.status(500).json({mesage:"Unexpected Error Occured"})
    }

    return res.status(200).json({users});
}

exports.addUsers = async (req,res,next) => {
    const {name,email,password} = req.body;

    if(
        !name && name.trim() === ""&& 
        !email && email.trim()==="" && 
        !password && password.trim() === "")
        {
        return res.status(422).json({message: "Invaild Inputs"})
    }
}

exports.signup = async (req,res,next) => {
    const {name,email,password} = req.body;
    console.log()
    if(
        !name && name.trim() === ""&& 
        !email && email.trim()==="" && 
        !password && password.trim() === "")
        {
        return res.status(422).json({message: "Invaild Inputs"})
    }

    let user;
    
    if(!user){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }

    try{
        user = new UserModel({name,email,password});
        user = user.save();
        return res.status(200).json({message:"succesfully sigup use"});
    }catch(error){
        return console.log(error);
    }
}