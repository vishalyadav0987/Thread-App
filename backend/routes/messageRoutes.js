const express = require('express');
const { protectedRoute } = require('../middleware/protectedRoute');
const {
    sendMessage,
} = require('../controllers/messageContoller');
const router = express.Router();


router.route('/').post(protectedRoute, sendMessage)

module.exports = router;