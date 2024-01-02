const express = require('express');
const router = express.Router();
const { createComment,deleteComment } = require('../controllers/comment.controller');


router.route('/:id/comments').post(createComment)
router.route('/:postId/comments/:commentId').delete(deleteComment)






module.exports = router;    