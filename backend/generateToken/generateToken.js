const jwt = require('jsonwebtoken')

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECERET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 1000,
        sameSite: "strict",
    });

    return token;
}

module.exports = {
    generateTokenAndSetCookie,
}