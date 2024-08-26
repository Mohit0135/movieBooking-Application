// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const Movie = require("../Models/Movies");


exports.addMovie = async (req,res,next) => {

    const extractedToken = req.headers.authorization.split("")[1];
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message: "Token Not Found"});
    }

    let adminId;
    console.log(adminId);

    JsonWebTokenError.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted) => {
        if(err){
            return res.status(401).json({message: `${err.message}`});
        }else{
            adminId = decrypted.id;
            return;
        }
    });

    const {title, description, releaseDate, posterUrl, featured} = req.body;
    console.log(title, description, releaseDate, posterUrl, featured);
    if(
        !title && 
        title.trim() === "" && 
        !description && 
        description.trim() == "" && 
        !posterUrl && 
        posterUrl.trim() == "") {
            return res.status(422).json({message: "Invalid Inputs"});
        }
        let movie;
        try {
            movie = new Movie({
                title,
                description,
                releaseDate: new Date(`${releaseDate}`),
                featured,
                actors,
                admin: adminId,
            });
            console.log(movie);
            movie = await movie.save();
        }catch(err){
             console.log(err);
             return res.status(500).json({message:"Internal Server Error"});
        }
        if(!Movie){
            return res.status(500).json({message:"Reuest Failed"})
        }
        return res.status(201).json({message:"Movie Added"})
};
