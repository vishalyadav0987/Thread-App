const { generateTokenAndSetCookie } = require('../generateToken/generateToken');
const UserSchema = require('../modals/UserShema');
const bcrypt = require('bcryptjs')

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
module.exports = {
    register,
    login,
    logout,
}