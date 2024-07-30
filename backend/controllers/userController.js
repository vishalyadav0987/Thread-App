const mongoose = require('mongoose');
const { generateTokenAndSetCookie } = require('../generateToken/generateToken');
const UserSchema = require('../modals/UserShema');
const bcrypt = require('bcryptjs')
const clodinary = require('cloudinary');
const PostSchema = require('../modals/PostSchema');

// REGISTER -- USER
const register = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const user = await UserSchema.findOne({ $or: [{ email }, { password }] });

        if (user) {
            return res.json({ success: false, message: "User Already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserSchema({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.json({
                success: true,
                message: "User Registered successfully.",
                data: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
                    bio: newUser.bio,
                    profilePic: newUser.profilePic
                }
            })
        }
        else {
            res.json({ success: false, message: "User not Registered, Please try again later!" });
        }
    } catch (error) {
        console.log("Error in register function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// LOGIN -- USER
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserSchema.findOne({ username });

        if (username.length == 0 || password.length < 1) {
            return res.json({ success: false, message: "Please field login credentials." })
        }

        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials." })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.json({ success: false, message: "Invalid Credentials." })
        }

        generateTokenAndSetCookie(user._id, res);

        res.json({
            success: true,
            message: "User logged in successfully.",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                bio: user.bio,
                profilePic: user.profilePic
            }
        })

    } catch (error) {
        console.log("Error in login function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

//LOGOUT -- USER
const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 1 });
        res.json({
            success: true,
            message: "User logout successfully.",
        })
    } catch (error) {
        console.log("Error in logout function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}


// FOLLOW and UNFOLLOW -- USER
const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const userToFollow = await UserSchema.findById(id);
        const currentUser = await UserSchema.findById(_id);

        if (id === _id.toString()) {
            return res.json({
                success: false,
                message: "You cannot follow/unfollow Yourself."
            });
        }

        if (!userToFollow || !currentUser) {
            return res.json({
                success: false,
                message: "User doesn't exist."
            });
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // unfollowUser
            await UserSchema.findByIdAndUpdate(id, { $pull: { followers: _id } });
            await UserSchema.findByIdAndUpdate(_id, { $pull: { following: id } });
            res.json({
                success: true,
                message: "User unfollow successfully."
            });
        }
        else {
            // followUser
            await UserSchema.findByIdAndUpdate(id, { $push: { followers: _id } });
            await UserSchema.findByIdAndUpdate(_id, { $push: { following: id } });
            res.json({
                success: true,
                message: "User follow successfully."
            });
        }
    } catch (error) {
        console.log("Error in followUnFollowUser function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// UPDATE -- USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, username, email, password, bio } = req.body;
        let { profilePic } = req.body;
        const userId = req.user._id;

        let user = await UserSchema.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not Found.",
            });
        }

        if (id !== userId.toString()) {
            return res.json({
                success: false,
                message: "You cannot update other profile."
            })
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (profilePic) {
            if (user.profilePic) {
                await clodinary.v2.uploader.destroy(user.profilePic.split('/').pop().split(".")[0])
            }
            const uploadProfileImg = await clodinary.v2.uploader.upload(profilePic);
            profilePic = uploadProfileImg.secure_url
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;


        await user.save();

        // jub hum kisi profile pe comment karte hai toh hamara username == vishal aur profile == x
        // toh agar hum apni profile update karte hai toh username aur profile change nh hogi comment me
        // isliye hu ye method use kar rahe hai

        await PostSchema.updateMany(
            { "replies.userId": userId },
            {
                $set: {
                    "replies.$[reply].username": user.username,
                    "replies.$[reply].userProfilePic": user.profilePic,
                }
            },
            { arrayFilters: [{ "reply.userId": userId }] }
        )
        res.json({
            success: true,
            message: "Profile Updated Successfully.",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                bio: user.bio,
                profilePic: user.profilePic
            }
        })
    } catch (error) {
        console.log("Error in updateUser function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

//GET -- USER PROFILE
const getUserProfile = async (req, res) => {
    try {
        // const { username } = req.params; 1st version
        // We will fetch user profile eihter usernmae or userId:PostedBy
        const { query } = req.params; // 2nd version
        // query either username or id
        let user;
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await UserSchema.findOne({ _id: query }).select("-password").select("-updatedAt");
        }
        else {
            user = await UserSchema.findOne({ username: query }).select("-password").select("-updatedAt");
        }
        if (!user) {
            return res.json({
                success: false,
                message: "User not Found.",
            })
        }
        res.json({
            success: true,
            data: user,
        })

    } catch (error) {
        console.log("Error in updateUser function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}
module.exports = {
    register,
    login,
    logout,
    followUnFollowUser,
    updateUser,
    getUserProfile,
}