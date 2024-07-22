const PostSchema = require('../modals/PostSchema');
const UserSchema = require('../modals/UserShema');

//CREATE POST
const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

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

module.exports = {
    createPost,
    getPost,
    deletePost,
    likeDislikePost,
}