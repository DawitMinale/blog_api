const express = require('express');
const router = express.Router();
const upload = require("../config/multerConfig"); // Correct path to multerConfig.js
const { createPost,getAllPosts,getSinglePost,deletePost,updatePost } = require('../controllers/Post.controller');



router.route('/').post(upload.array('images', 3),createPost).get(getAllPosts);
router.route('/:id').get(getSinglePost).delete(deletePost).put(updatePost);


module.exports = router;