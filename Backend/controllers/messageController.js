const Conversation = require("../models/conversation");
const Message = require("../models/message");

const sendMessage = async (req,res) => {
    try{
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        console.log(senderId,receiverId);

        let conversation = await Conversation.findOne({
            participants : {$all: [senderId,receiverId]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId]
            })
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        await newMessage.save();
        await conversation.save();

        res.status(201).json(newMessage);

    }
    catch(error) { 
        console.log("Error in sendMessage Controller: ",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
};

const getMessages = async (req,res) => {
    try{
        const usertochat = req.params.id;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId,usertochat]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }
        
        res.status(200).json(conversation.messages);

    }
    catch (error){
        console.log("Error in getMessage Controller: ",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}

module.exports = {sendMessage,getMessages};