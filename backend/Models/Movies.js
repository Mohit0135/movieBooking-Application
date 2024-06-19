const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    releaseDate:{
        type: Date,
        required:true
    },
    posterURL:{
        type: String,
        required:true
    },
    featured:{// i don't know why it is added 
        type: Boolean,
    },
    bookings:[
        {
            type:String,
        },
    ],
    admin:{
        type: String,
        required:true,
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
