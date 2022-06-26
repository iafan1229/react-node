const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movieName: String,
    movieId: Number
},
{collection: 'Movie'})

const MovieList = mongoose.model('Movie', movieSchema)

module.exports = { MovieList }