const express = require('express');
const { protectedRoute } = require('../middleware/protectedRoute');
const {
    sendMessage,
    getMessage,
} = require('../controllers/messageContoller');
const router = express.Router();


router.route('/').post(protectedRoute, sendMessage)
router.route('/:otherUserId').get(protectedRoute, getMessage)

module.exports = router;