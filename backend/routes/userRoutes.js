const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    followUnFollowUser,
    updateUser,
    getUserProfile,
} = require('../controllers/userController');
const { protectedRoute } = require('../middleware/protectedRoute')


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/follow/:id').post(protectedRoute, followUnFollowUser);
router.route('/update/:id').put(protectedRoute, updateUser);
router.route('/profile/:username').get(getUserProfile);


module.exports = router