const User = require("../models/user");

const getUsers = async (req,res) => {
    try {
        const userId= req.user._id;

        const allUsers = await User.find( {_id : {$ne: userId}}).select("-password");

        res.status(200).json({allUsers});

    }
    catch (error){
        console.error("Error in getUsers of Usercontroller");
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = getUsers;