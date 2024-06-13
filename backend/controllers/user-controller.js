const User = require('../models/User');

exports.getAllUsers = async (req,res,next) => {
    let users;
    try {
        users = await User.find();
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
    if(!name &&  !email && !password )
        {
            return res.status(422).json({message: "Invaild Inputs"})
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
