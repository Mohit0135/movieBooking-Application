const User = require('../models/User');
const bycrypt = require('bcryptjs');

exports.getAllUsers = async (req,res,next) => {
    let users;
    users = await User.find();

    try {
        if(!users){
            return res.status(500).json({mesage:"Unexpected Error Occured"})
        }
        return res.status(200).json({users});
    }catch(error){
        console.log(error)
        return res.status(500);
    }
}

exports.signup = async (req,res,next) => {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
        return res.status(400).json({ message: 'Name, password, and email are required' });
    }

    try {
        const newUser = new User({
            name,
            username,
            password,
            email,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.updateUser = async (req,res,next) => {
    const id  = req.params.id;
    const { name, email, password, username } = req.body;

    if(!name || !email || !password ||!username){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    let user;

    try{
        const hassedPassword = bycrypt.hashSync(password);

        user = await User.findByIdAndUpdate(id,{
            name,
            email, 
            username,
            password:hassedPassword
        });
    }catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"Sommething went wrong"})
    }
    res.status(200).json({mesage:"Updated Sucessfullly"});
};


exports.deleteUser = async (req,res,next) => {
    const id  = req.params.id;

    if(!id){
        return res.status(401).json({message:"Sommething went wrong"})
    }

    try{
        await User.findByIdAndDelete(id);
        return res.status(200).json({mesage:"deleted Sucessfullly"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
};


//login keleye email pssw in body / verify that using jwt token 
// jwt use kese karna hai nahi pata learn that 
export const login = async (res,req,next) => {
    const { email, password } = res.body;
    if(!email || !password )
    {
        return res.status(422).json({message:"Invalid Inputs"})
    }

    try{

        return res.status(200).json({message:"Logged in Sucessfully"});
    }catch(error){
        console.log("Error:",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}