const Post = require('../models/post.model');
const User=require("../models/user.model")

// const asyncHandler = require('express-async-handler');


// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user','name').populate('category','name');
    
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const createPost = async (req, res) => {
    // Assuming the 'images' field in the form is used for file uploads
    const images = req.files.map(file => file.filename);
    const { title, description, category, tags } = req.body;
    const user = req.userId.userId;
    console.log(tags,description,category,title,user);
  
    try {
      const post = await Post.create({ title, description, images, category, tags, user });
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const getSinglePost=async(req,res)=>{
    const {id:postID}=req.params
    const post=await Post.findOne({_id:postID}).populate('user','name').populate('category','name')
    if(!post){
        return res.status(404).json({msg:`No post with id:${postID}`})
    }
    res.status(200).json(post)
}

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, description, category, tags } = req.body;
    const userId = req.user._id;
  
    try {
      const post = await Post.findOne({ _id: postId, user: userId });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found or you do not have permission to update it' });
      }
  
      // Handle image updates
      if (req.files && req.files.length > 0) {
        // Assuming you want to replace existing images
        const newImages = req.files.map(file => file.filename);
        post.images = newImages;
      }
  
      // Update other fields
      post.title = title || post.title;
      post.description = description || post.description;
      post.category = category || post.category;
      post.tags = tags || post.tags;
  
      // Save the updated post
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // if (post.user._id.toString() !== req.userId) {
    //   return res.status(403).json({ message: 'Unauthorized: You do not have permission to delete this post' });
    // }

    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { deletePost };

  




module.exports = { getAllPosts ,createPost,getSinglePost,deletePost,updatePost};

