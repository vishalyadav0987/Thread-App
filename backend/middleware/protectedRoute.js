const jwt = require('jsonwebtoken');
const UserSchema = require('../modals/UserShema')
const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({ success: false, message: "User Un-Authorized." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECERET);

        const user = await UserSchema.findById(decoded.userId).select("-password");

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectedRoute function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

module.exports = {
    protectedRoute,
}