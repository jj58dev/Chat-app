const { process_params } = require('express/lib/router');
const jwt = require('jsonwebtoken');

const generateToken= (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'3d'
    })
    res.cookie("jwt",token,{
        maxAge: 3*24*60*60*1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
};

module.exports = generateToken;