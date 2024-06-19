// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Movie = require("../Models/Movies");


exports.addMovie = async (req,res,next) => {
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

    let existingMovie;
    try{
        existingMovie = await Movie.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(existingMovie){
        return res.status(400).json({message: "movie already exists"});
    } 

    let movie;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        movie = new Movie({
            name,
            username,
            email,
            password:hashedPassword
        });
        movie = await Movie.save();
    }catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(500).json({message:"Unable to store movie"})
    }
    return res.status(200).json({movie});
}
