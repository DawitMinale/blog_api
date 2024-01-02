const mongoose = require('mongoose');
const commentSchema = require('./comment.model');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide a title']
    },
    description:{
        type:String,
        required:[true,'Please provide a description']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
   tags:[{
        type:mongoose.Schema.ObjectId,
        ref:'Tag',
        required:true
    }],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
    },
    comments:[{
        type:commentSchema,
        ref:'Comment',
    }],
    image: {
        type: String, 
        // required: [true, 'Please provide an image']
      }

},{timestamps:true})


module.exports=mongoose.model('Post',PostSchema);