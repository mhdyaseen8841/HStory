
const Chat = require('../model/chatModel')
const asyncHandler = require('express-async-handler')
const User = require("../model/UserModel");


const accessChat = asyncHandler(async (req, res) => {

    const {userId}=req.body;

    if(!userId){
        res.status(400)
        throw new Error('UserId params not sent with request')
    }
    
    var isChat = await Chat.find({isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}}
            ,{users:{$elemMatch:{$eq:userId}}}
        ]}).populate("users","-password").populate("latestMessage")

isChat= await User.populate(isChat,{
    path:"latestMessage.sender",
    select:"name pic email"
})
if(isChat.length > 0){
    console.log("ehhehhehe");
    console.log(isChat[0])
    res.send(isChat[0])
}else{
console.log("uhuhughug");
    var chatData={
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id,userId]
    }

    try{
        const createdChat = await Chat.create(chatData)
        const Fullchat = await Chat.findOne({_id:createdChat._id}).populate("users","-password")
        res.status(200).send(Fullchat)
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
}
})

const fetchChats = asyncHandler(async (req, res) => {

    try{   
       Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt: -1}).then(async(result)=>{
        result =await User.populate(result,{
            path:"latestMessage.sender",
            select:"name pic email"
        })  
res.status(200).send(result)
       }).catch((error)=>{
              res.status(400)
              throw new Error(error.message)
         })
        }catch(error){
            res.status(400)
            throw new Error(error.message)
        }
   

})

const createGroupChat = asyncHandler(async (req, res) => {

    if(!req.body.users || !req.body.name){
        res.status(400)
        throw new Error('Please send all required fields')
    }

    var users= JSON.parse(req.body.users)
    if(users.length < 2){

        res.status(400)
        throw new Error('Please add atleast 2 users')
    }
    users.push(req.user)
    try{
        const groupChat = await Chat.create({
            chatName:req.body.name,
            isGroupChat:true,
            groupAdmin:req.user,
            users:users
        })
        const fullGroupChat = await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password")
        res.status(200).send(fullGroupChat)
    }catch(err){
        res.status(400)
        throw new Error(err.message)
    }
});


const renameGroup = asyncHandler(async (req, res) => {
    const {chatId, chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat){
        res.status(400)
        throw new Error('Chat not found')
    }else{
        res.json(updatedChat)
    }
}
)


const addToGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
   
    const chat = await Chat.findById(chatId);

    if (!chat) {
        res.status(400)
        throw new Error('Chat not found');
    }

    if (chat.users.includes(userId)) {
        res.status(400)
        throw new Error('User already exists in the chat');
    }

    
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {users: userId},
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
     
    if(!added){
        res.status(400)
        throw new Error('Chat not found')
    }else{
        res.json(added)
    }
}   
)



const removeFromGroup = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {users: userId},
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
     
    if(!added){
        res.status(400)
        throw new Error('Chat not found')
    }else{
        res.json(added)
    }
}   
)
module.exports = {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup}