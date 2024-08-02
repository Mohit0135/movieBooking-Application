const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

exports.postCategories = async (req, res, next) => {
  try {
    const fileName = req.body.image;
    const [result] = await client.safeSearchDetection(fileName);
    const detections = result.safeSearchAnnotation;
    const moderationResult = {
        adult: detections.adult,
        medical: detections.medical,
        spoof: detections.spoof,
        violence: detections.violence,
        racy: detections.racy
    };
    return res.status(200).json(moderationResult);
  } catch (error) {
      console.error('Error during image moderation:', error);
      return res.status(500).send({
          status: 'fail',
          message: 'Error processing image for moderation.'
      });
  }
};

exports.getAllUsers = async (req,res,next) => {
    let users;
    users = await User.find();

    try {
        if(!users && users.trim() === ""){
            return res.status(500).json({mesage:"Unexpected Error Occured"})
        }
        return res.status(200).json({users});
    }catch(error){
        console.log(error)
        return res.status(500);
    }

}

exports.signup = async (req, res, next) => {
    const { name, username, password, email } = req.body;

    if (!name || name.trim() === "" ||
        !username || username.trim() === "" ||
        !password || password.trim() === "" ||
        !email || email.trim() === "") {
        return res.status(400).json({ message: 'Name, username, password, and email are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            email,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateUser = async (req,res,next) => {
    const id  = req.params.id;
    const { name, email, password, username } = req.body;

    if(!name && name.trim() === ""
    || !email && email.trim() === ""
    || !password && password.trim() === ""
    ||!username && username.trim() === ""){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    let user;

    try{
        const hassedPassword = bcrypt.hashSync(password);

        user = await User.findByIdAndUpdate(id,{
            name,
            email, 
            username,
            password:hassedPassword
        });
    }catch(err){
        return console.log(err);
    }

    if(!user && user.trim() === ""){
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


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "Unable to find user with this email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "Login Successful" });
};