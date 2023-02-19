const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;

    if(!content || !chatId){
        console.log("No content or chatId");
        return res.status(400)
       
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try{
console.log(newMessage);
var message = await Message.create(newMessage);

message = await message.populate("sender","name pic");
message = await message.populate("chat");
message = await User.populate(message,{
    path:'chat.users',
    select: "name pic email"
})

await Chat.findByIdAndUpdate(req.body.chatId,{
    latestMessage: message,
})

res.json(message)

    }catch(err){
        res.status(400)
        throw new Error(err.message)
        
    }
}
);


const allMessages = asyncHandler(async (req, res) => {
try{
    const messages = await Message.find({chat:req.params.chatId}).populate("sender", "name pic email").populate("chat");
    res.json(messages)

}catch(err) {
    res.status(400)
    throw new Error(err.message)
}
})

module.exports = {sendMessage, allMessages}