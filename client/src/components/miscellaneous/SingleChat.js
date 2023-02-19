import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './updateGroupChatModal'
import "./styles.css"
import ScrollableChat from './ScrollableChat'
import io from "socket.io-client"
import Lottie from 'react-lottie';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require('../../animations/typing.json'),
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;



function SingleChat({fetchAgain, setFetchAgain}) {

    const toast = useToast()
const [messages, setMessage] = useState([])
const [loading,setLoading] = useState(false)
const [isTyping,setIsTyping] = useState(false)
const [socketConnected, setSocketConnected] = useState(false)
const [newMessage, setNewMessage] = useState()
const {user,selectedChat,setSelectedChat, notifications,setNotifications} = ChatState()


useEffect(() => {
  
    socket = io(ENDPOINT);
       socket.emit("setup",user)
       socket.on('connected',()=> setSocketConnected(true))
       socket.on('typing',()=>setIsTyping(true))
         socket.on('stop typing',()=>setIsTyping(false))
     }, [])
     
     

const fetchMessages = async () => {
    if(!selectedChat) return;
    try{
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`,
            },
        }
        setLoading(true)
        const {data} = await axios.get('/api/message/'+selectedChat._id,config)
        setMessage(data)
        setLoading(false)
        socket.emit('join chat',selectedChat._id);
        
    
    }catch(err){
        toast({
            title: "Error Occured!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left"
          })
          return;
    }

}


useEffect(() => {
  
fetchMessages();
  selectedChatCompare= selectedChat;
}, [selectedChat])



useEffect(() => {
  
    socket.on("message recieved",(newMessageRecieved)=>{
 if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
if(!notifications.includes(newMessageRecieved)){
    setNotifications([...notifications,newMessageRecieved])
   
    setFetchAgain(!fetchAgain)
}
 }else{
    setMessage([...messages,newMessageRecieved])
 }

    }, [selectedChat])
    

})

const sendMessage = async (e) =>{

if(e.key==="Enter" && newMessage){
    socket.emit('stop typing',selectedChat._id);

try{
    const config = {
        headers:{
            "COntent-Type":"application/json",
            Authorization: `Bearer ${user.token}`,
        },
    }
    setNewMessage("")
    const {data} = await axios.post("/api/message",{
        content: newMessage,
        chatId: selectedChat._id,
    },
    config  
      );
    
      setMessage([...messages,data])

socket.emit('new message',data)

}catch(err){
    toast({
        title: "Error Occured!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
      return;
}
}
}
const typingHandler = (e) =>{
    setNewMessage(e.target.value)

    if(!socketConnected) return;

    if(!isTyping){
        setIsTyping(true)
    socket.emit('typing',selectedChat._id);
    }

let lastTypingTime = (new Date()).getTime();
var timerLength = 3000;
setTimeout(() => {
    var timeNow = (new Date()).getTime();
  var  timeDiff = timeNow - lastTypingTime;
    if (timeDiff >= timerLength && isTyping) {
        socket.emit('stop typing',selectedChat._id);
        setIsTyping(false)
    }
}, timerLength);

}

  return (
    <>
{selectedChat ? (
    <>
    <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
        >
   <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
                <> 
                
                {getSender(user,selectedChat.users)}
                <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
                </>
            ):(
                <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal   
             
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                    />
                </>
            )}
    </Text>
    <Box
    display="flex"
    flexDir="column"
    justifyContent="flex-end"
    p={3}
    bg="#E8E8E8"
    w="100%"
    h="100%"
    borderRadius="lg"
    overflowY="hidden"
    >
{loading?(
    <Spinner 
    size="xl"
    w={20}
    h={20}
    alignSelf="center"
    margin="auto"
    />
):(
  <div className='messages'>
   <ScrollableChat  messages={messages} />
  </div>
)}
<FormControl onKeyDown={sendMessage} isRequired mt={3}>
    {isTyping ? <div> <Lottie
    options={defaultOptions}
    width={70}
    style={{ marginBottom:15, marginLeft: 0}}
    /> </div>:(<></>)}
<Input 
varient="filled"
bg="#E0E0E0"
placeholder="Enter a message"
onChange={typingHandler}
value={newMessage}
/>
</FormControl >
    </Box>
    </>
):
(
 <Box display="flex" alignItems="center" justifyContent="center"  h="100%">
<Text
fontSize="3xl" pb={3} fontFamily="work sans"
>
    Click on a user to start chatting
</Text>
    </Box>
)

}

    </>
  )
}

export default SingleChat