const express = require('express');
const { protectedRoute } = require('../middleware/protectedRoute');
const {
    sendMessage,
    getMessage,
    getConversation,
} = require('../controllers/messageContoller');
const router = express.Router();


router.route('/conversation').get(protectedRoute, getConversation)
router.route('/').post(protectedRoute, sendMessage)
router.route('/:otherUserId').get(protectedRoute, getMessage)

module.exports = router;