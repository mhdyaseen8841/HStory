import { Box, Stack, useToast,Text } from '@chakra-ui/react';
import React,{useState,useEffect} from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { Button } from '@chakra-ui/button'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading';
import { getSender } from '../../config/ChatLogics';
import GroupChatModal from './GroupChatModal';
function MyChats({fetchAgain}) {

const [loggedUser, setLoggedUser] = useState();

  const {selectedChat, setSelectedChat, user, chats, setChats} = ChatState()

const toast = useToast();

const fetchChats = async  () => {

  try{
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    const {data} = await axios.get(`/api/chat`, config)
    setChats(data)
    console.log("deeeeetaaaaaaaa")
    console.log(data)
  }catch(error){
    toast({
      title: "Error Occured! ",
      description: "Failed to fetch chats! ",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left"
    })
  }
}

useEffect(() => {
  setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
  fetchChats()
}, [fetchAgain])


  return (
   <Box 
   display={{base: selectedChat ? "none" : "flex", md: "flex"}}
   flexDir="column"
   alignItems="center"
   p={3}
   bg="white"
   w={{base: "100%", md: "31%"}}
   borderRadius="lg"
   borderWidth="1px"
   >
    <Box
     pb={3}
     px={3}
     fontSize={{ base: "28px", md: "30px" }}
     fontFamily="Work sans"
     display="flex"
     w="100%"
     justifyContent="space-between"
     alignItems="center">
My Chats

    </Box>
    
    <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >

{chats?(
<Stack overflowY='scroll'>
{
  chats.map((chat)=>(
    <Box
    onClick={() => setSelectedChat(chat)}
    cursor="pointer"
    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
    color={selectedChat === chat ? "white" : "black"}
    px={3}
    py={2}
    borderRadius="lg"
    key={chat._id}
    >
<Text>
                  {
                    getSender(user, chat.users)
                   }
                </Text>

    </Box>
  
  ))
}
</Stack>
):(
<ChatLoading/>
)}
        </Box>  

   </Box>
  )
}

export default MyChats