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

// exports.addUsers = async (req,res,next) => {
//     const {name,email,password} = req.body;
//     if(!name &&  !email && !password )
//         {
//             return res.status(422).json({message: "Invaild Inputs"})
//         }
// }

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
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    const hassedPassword = bycrypt.hashSync(password);
    let user;

    try{
        user = await User.findByIdAndUpdate(id,{
            name,
            email, 
            username,
            password
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
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    const hassedPassword = bycrypt.hashSync(password);
    let user;

    try{
        user = await User.findByIdAndDelete(id,{
            name,
            email, 
            username,
            password
        });
    }catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"Sommething went wrong"})
    }
    res.status(200).json({mesage:"deleted Sucessfullly"});
};