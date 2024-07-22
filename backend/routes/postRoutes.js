const express = require('express');
const { createPost,
    getPost,
    deletePost,
} = require('../controllers/postController');
const router = express.Router();
const { protectedRoute } = require('../middleware/protectedRoute')


router.route('/:id').get(getPost).delete(protectedRoute, deletePost);
router.route('/create').post(protectedRoute, createPost);


module.exports = router;