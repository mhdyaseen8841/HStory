import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider,Drawer, useDisclosure,Image, DrawerContent,DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,Input, useToast } from "@chakra-ui/react";
  import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
 
import React, { useState } from "react";
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChatState } from "../../Context/ChatProvider";
import {Spinner} from "@chakra-ui/spinner"
import ProfileModal from "./ProfileModal";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
function SideDrawer() {
  const toast = useToast()
  const {user,setSelectedChat,chats,setChats,notifications,setNotifications} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState("");
  

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
 
  const Navigate = useNavigate();


const handleSearch = async() => {
if(!search){
  toast({
    title: "Please Enter Something in search! ",
    status: "warning",
    duration: 5000,
    isClosable: true,
    position: "top-left"
  })
  return;
}

try{
setLoading(true)

const config = {
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
}
  const {data} = await axios.get(`/api/user?search=${search}`, config)

  setLoading(false)
  setSearchResults(data)
}catch(error){
  toast({
    title: "Error Occured! ",
    description: "Failed to search users! ",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom-left"
  })
}
  }

const accessChat = async (userId) => {
  try{
setLoadingChat(true)


const config = {
  headers: {
    "Content-type" : "application/json",
    Authorization: `Bearer ${user.token}`,
  },
}
 const {data} = await axios.post(`/api/chat`, {userId}, config)
 console.log(data);
 if(!chats.find((c)=> c._id === data._id)) setChats([data, ...chats])

 setSelectedChat(data)
setLoadingChat(false)
onClose();
  }catch(err){
    toast({
      title: "Error Occured! ",
      description: err.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left"
    })
    setLoadingChat(false)
  }

}

const logoutHandler = () => {
  localStorage.removeItem("userInfo");
  Navigate("/")
}

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ sm: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" >
          Hstory
        </Text>
        <div>
          <Menu>
<MenuButton p={1}>
  <NotificationBadge
  count = {notifications.length}
effect = {Effect.SCALE}
>

  </NotificationBadge>
<BellIcon fontSize="2xl" m={1} />
</MenuButton>
<MenuList pl={2}>
  {!notifications.length && "No New Messages"}
  {notifications.map((n) => (
<MenuItem key={n._id} onClick={()=>{
  setSelectedChat(n.chat)
  setNotifications(notifications.filter((n)=> n.chat._id !== n.chat._id))
}}>
{n.chat.isGroupChat?`New Message in ${n.chat.chatName}`:`New Message from ${getSender(user,n.chat.users)}`}
</MenuItem>
  ))}
    
</MenuList>
          </Menu>

          <Menu>
<MenuButton p={1} as={Button} rightIcon ={<ChevronDownIcon/>}>
<Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
</MenuButton>
<MenuList>
  <ProfileModal user={user}>
 
  </ProfileModal>
  <MenuDivider/>
  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
</MenuList>
          </Menu>
        </div>
      </Box>


      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
<DrawerContent>
  <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
  <DrawerBody>
<Box display="flex" pb={2}>
  <Input placeholder="Search by name or email"
  mr={2}
  value={search}
  onChange={(e)=> setSearch(e.target.value)}
  />
  <Button onClick={handleSearch}>Go</Button>
</Box>
{loading ? (
<ChatLoading/>
):(
searchResults?.map(user =>(
  <UserListItem
  key={user._id}
  user={user}
  handleFunction={()=>accessChat(user._id)}
  />
))
)
}
{loadingChat && <Spinner ml="auto" d="flex" /> }
</DrawerBody>
</DrawerContent>

      </Drawer>
    </>
  );
}

export default SideDrawer;
