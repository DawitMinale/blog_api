const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);
    const user=req.userId.userId

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      comment,
      user,
    };

    // Check if the comments field exists on the post
    if (!post.comments) {
      post.comments = [];
    }

    // Push the new comment to the comments array
    post.comments.push(newComment);

    // Save the post with the new comment
    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;
    // console.log(postId,commentId);
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = post.comments.find((c) => c._id.toString() === commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
 
  
      post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
      await post.save();
  
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = { createComment, deleteComment };
