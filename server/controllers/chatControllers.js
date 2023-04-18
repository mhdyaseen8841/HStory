
const Chat = require('../model/chatModel')
const asyncHandler = require('express-async-handler')
const User = require("../model/UserModel");
const Doctor = require("../model/DoctorModel");
const { ObjectId } = require('mongodb');

const accessChat = asyncHandler(async (req, res) => {

    const {doctorId}=req.body;

    if(!doctorId){
        res.status(400)
        throw new Error('doctorId params not sent with request')
    }
    
    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: doctorId } } },
          ],
    }).populate("users","-password").populate("latestMessage")

isChat= await Doctor.populate(isChat,{
    path:"latestMessage.sender",
    select:"DocName pic DocEmail"
})

if(isChat.length > 0){
    console.log("ehhehhehe");
    console.log(isChat[0])
    res.send(isChat[0])
}else{
    
console.log("uhuhughug");

const objectId = ObjectId(doctorId);

        const doctor = await Doctor.findOne({ _id: new ObjectId(doctorId) })
        if(doctor){

            var chatData={
                chatName: "sender",
                users: [req.user._id, doctorId],
            }
            

            try{
                const createdChat = await Chat.create(chatData)
                const Fullchat = await Chat.findOne({_id:createdChat._id})
                res.status(200).send(Fullchat)
            }catch(error){
                
                console.log(error);
                res.status(400)
                throw new Error(error.message)
            }


        }else{
            errmsg="doctor not found"
            res.status(400)
                throw new Error(errmsg)
        }
  




}
})



const fetchChats = asyncHandler(async (req, res) => {

    try{   
       Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("latestMessage").sort({updatedAt: -1}).then(async(result)=>{
        result =await Doctor.populate(result,{
            path:"latestMessage.sender",
            select:"DocName pic email"
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









module.exports = {accessChat, fetchChats}