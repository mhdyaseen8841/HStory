import { logDOM } from '@testing-library/react'
import React from 'react'
import axios from 'axios'
import {ChatState} from '../Context/ChatProvider'
import { useEffect ,useState} from 'react'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/miscellaneous/MyChats'
import ChatBox from '../components/miscellaneous/ChatBox'
import { useNavigate } from 'react-router-dom';

function ChatPage() {
    const Navigate = useNavigate();
    const {user} = ChatState()
    const [chats, setChat] = useState([])
const [fetchAgain, setFetchAgain] = useState(false)
useEffect(() => {

 if(!user){
    Navigate("/")
 }


}, [])



    return (
    <div style={{width: "100%"}}>
{user && <SideDrawer/>}
<Box
display='flex'
justifyContent='space-between'
w='100%'
h='91.5vh'
p='10px'
>
    {user && <MyChats fetchAgain={fetchAgain} />}
    {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
</Box>
    </div>
  )
}

export default ChatPage