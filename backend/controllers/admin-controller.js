const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");


exports.addAdmin = async (req,res,next) => {
    const name = req.body?.name;
    const username = req.body?.username;
    const password = req.body?.password;
    const email = req.body?.email;

    console.log(name,username,password,email);
    if (
    !name || name.trim() === "" ||
    !username || username.trim() === "" ||
    !password || password.trim() === "" ||
    !email || email.trim() === "") {
        return res.status(400).json({ message: 'Name, username, password, and email are required' });
    }

    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(existingAdmin){
        return res.status(400).json({message: "Admin already exists"});
    } 

    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        admin = new Admin({
            name,
            username,
            email,
            password:hashedPassword
        });
        admin = await admin.save();
    }catch(err){
        return console.log(err);
    }
    if(!admin){
        return res.status(500).json({message:"Unable to store admin"})
    }
    return res.status(200).json({admin});
}

exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    let existingAdmin;
    try {    
        existingAdmin = await Admin.findOne({ email });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }

    if (!existingAdmin) {
        return res.status(404).json({ message: "Unable to find admin with this email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });

    return res.status(200).json({ message: "Authentication Successful", token, id: existingAdmin._id });
}
