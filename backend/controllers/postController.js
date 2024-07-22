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
        console.log("Error in createPost function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

module.exports = {
    createPost,
    getPost,
}