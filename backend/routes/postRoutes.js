const express = require('express');
const { createPost,
    getPost,
} = require('../controllers/postController');
const router = express.Router();
const { protectedRoute } = require('../middleware/protectedRoute')


router.route('/:id').get(getPost);
router.route('/create').post(protectedRoute, createPost);

module.exports = router;