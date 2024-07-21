const UserSchema = require('../modals/UserShema');
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const user = await UserSchema.findOne({ $or: [{ email }, { password }] });

        if (user) {
            res.json({ success: true, message: "User Already exists." })
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
            res.json({
                success: true,
                message: "User Registered successfully.",
                data: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
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

module.exports = {
    register
}