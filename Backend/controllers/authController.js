const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");



const signin = async (req,res) => {
    try{
        const {fullName,username,password,confirmPassword,gender} = req.body;
        
        if(password!==confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }
        
        const user= await User.findOne({username});
        
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }
        
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic : gender === "male"? boyProfilePic:girlProfilePic
        });
        
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            
            res.status(200).json({
                _id:newUser._id,
                fullname:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic,
            });
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }
        
        
    } catch (error){ 
        console.log("Error in signin controller: ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const login = async (req,res) => {
    try{
        const {username,password} = req.body;
        
        const user= await User.findOne({username});
        
        if(!user){
            return res.status(400).json({error:"Username does not exist"});
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error:"Incorrect Password"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullname:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        });
        
        
        
    } catch (error){ 
        console.log("Error in login controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch { 
        console.log("Error in logout controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports= {login,signin,logout};