const express = require('express');
const { createPost,
    getPost,
    deletePost,
    likeDislikePost,
    repliesUserPost,
    getFeed,
} = require('../controllers/postController');
const router = express.Router();
const { protectedRoute } = require('../middleware/protectedRoute')


router.route('/feed').get(protectedRoute, getFeed)
router.route('/:id').get(getPost).delete(protectedRoute, deletePost);
router.route('/create').post(protectedRoute, createPost);
router.route('/like/:id').post(protectedRoute, likeDislikePost);
router.route('/reply/:id').post(protectedRoute, repliesUserPost);


module.exports = router;