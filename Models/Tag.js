const  mongoose = require('mongoose')
const TagSchema = new mongoose.Schema({
  tag_title: {
    type: String,
    required: true,
  },
  
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }

},{timestamps: true})
module.exports = mongoose.model('Tag',TagSchema)