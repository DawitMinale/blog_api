const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:[true,'Please provide a comment']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

module.exports=CommentSchema;


