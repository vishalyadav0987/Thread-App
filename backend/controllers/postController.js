const PostSchema = require('../modals/PostSchema');
const UserSchema = require('../modals/UserShema');
const cloudinary = require('cloudinary').v2;

//CREATE POST
const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;
        // idhar postedby ka maltalb hai ush user ki id jisne post ki hai
        if (!postedBy || !text) {
            return res.json({
                success: false,
                message: "Postedby and text fields are required."
            })
        }

        const user = await UserSchema.findById(postedBy);

        if (!user) {
            return res.json({
                success: false,
                message: "User not Found.",
            })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.json({
                success: false,
                message: "Un-Authorized to create post.",
            })
        }

        if (img) {
            const uploadPostImage = await cloudinary.uploader.upload(img);;
            img = uploadPostImage.secure_url;
        }

        const maxLength = 500;

        if (text.length > maxLength) {
            return res.json({
                success: false,
                message: `Text must be less than ${maxLength} characters.`
            })
        }

        const newPost = new PostSchema({
            postedBy,
            text,
            img
        });


        await newPost.save();

        res.json({
            success: true,
            message: "Post Successfully posted.",
            data: newPost,
        })

    } catch (error) {
        console.log("Error in createPost function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// GET SINGLE -- USER POST
const getPost = async (req, res) => {
    try {
        const { id: postId } = req.params;

        const post = await PostSchema.findById(postId);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not Found.",
            });
        }

        res.json({
            success: true,
            data: post,
        })
    } catch (error) {
        console.log("Error in getPost function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

//DELETE POST
const deletePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { _id: userId } = req.user;

        const post = await PostSchema.findById(postId);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not Found.",
            });
        }

        if (userId.toString() !== post.postedBy._id.toString()) {
            return res.json({
                success: false,
                message: "Un-Authorized to delete post.",
            });
        }

        if (post.img) {
            const imageId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imageId)
        }

        await PostSchema.findByIdAndDelete(postId);
        res.json({
            success: true,
            message: "Post deleted Successfully."
        })
    } catch (error) {
        console.log("Error in deletePost function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// LIKE AND DISLIKE POST -- USER
const likeDislikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { _id: userId } = req.user;


        const post = await PostSchema.findById(postId);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not Found.",
            });
        }
        // check kar rahe hai
        const userLikedPost = post.likes.includes(userId);
        if (userLikedPost) {
            // agar like hogi toh dislike [unlike]
            await PostSchema.updateOne({ _id: postId }, { $pull: { likes: userId } });
            res.json({ success: true, message: "Post unliked succesfully." });
        }
        else {
            // liked
            post.likes.push(userId);
            await post.save();
            res.json({ success: true, message: "Post liked succesfully." });
        }
    } catch (error) {
        console.log("Error in likeDislikePost function ->", error.message);
        res.json({ success: false, message: error.message })
    }

}

// REPLIES
const repliesUserPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { text } = req.body;
        const { username } = req.user;
        const { _id: userId } = req.user;
        const { profilePic: userProfilePic } = req.user;

        if (!text) {
            return res.json({
                success: false,
                message: "Text field is required.",
            });
        }

        const post = await PostSchema.findById(postId);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not Found.",
            });
        }

        const reply = { text, username, userId, userProfilePic };
        post.replies.push(reply);
        await post.save();

        res.json({
            success: true,
            message: "Reply added successfully",
            data: post,
            reply,
        });
    } catch (error) {
        console.log("Error in repliesUserPost function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// GET POSTS
const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params
        const { _id: postedBy } = req.user;
        const user = await UserSchema.findOne({ username });
        if (!user) {
            return res.json({
                success: false,
                message: "User not Found.",
            });
        }

        const posts = await PostSchema.find({ postedBy: user._id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: posts,
        });
    } catch (error) {
        console.log("Error in getUserPosts function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// GET FEEF
const getFeed = async (req, res) => {
    try {

        const { _id: userId } = req.user
        const user = await UserSchema.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not Found.",
            });
        }

        // jis jis ko follow kar rakha ho usi ke post show ho gi front pe 
        // following is arrays of id of multiple user jisko user ne follow kara rakha hai
        const following = user.following;

        // { $in: following } is a MongoDB operator that matches any value in the array following. The following array contains the IDs of users that the current user is following.

        const feedPosts = await PostSchema.find({
            postedBy: { $in: following }
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: feedPosts
        })

    } catch (error) {
        console.log("Error in getFeed function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

module.exports = {
    createPost,
    getPost,
    deletePost,
    likeDislikePost,
    repliesUserPost,
    getFeed,
    getUserPosts,
}