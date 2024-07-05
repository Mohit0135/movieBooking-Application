const express = require('express');
const Movie = require ("../controllers/movie-controller");

const movieRouter = express.Router();

movieRouter.get(
    '/addmovie', 
    Movie.addMovie
);


module.exports = movieRouter;