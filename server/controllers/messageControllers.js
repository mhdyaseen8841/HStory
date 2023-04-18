const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");
const User = require("../model/UserModel");

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

message = await message.populate("sender","DocName pic");
message = await message.populate("chat");
message = await User.populate(message,{
    path:'chat.users',
    select: "DocName pic DocEmail"
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
    console.log("hiii")

    console.log(req.params.chatId)
    const messages = await Message.find({chat:req.params.chatId}).populate("sender", "DocName pic DocEmail").populate("chat");
    res.json(messages)

}catch(err) {
    console.log("error");
    res.status(400)
    console.log(err.message);
    throw new Error(err.message)
}
})

module.exports = {sendMessage, allMessages}