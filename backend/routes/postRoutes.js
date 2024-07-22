const express = require('express');
const { createPost } = require('../controllers/postController');
const router = express.Router();
const { protectedRoute } = require('../middleware/protectedRoute')


router.route('/create').post(protectedRoute, createPost);

module.exports = router;