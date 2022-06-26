const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  comment: String,
  dataNum: Number
},
{collection: 'Community'})

const Post = mongoose.model('Post', postSchema)

module.exports = { Post }