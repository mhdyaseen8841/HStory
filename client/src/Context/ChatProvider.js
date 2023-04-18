import { createContext, useContext, useState, useEffect ,} from "react";
import { useNavigate } from 'react-router-dom'
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const Navigate = useNavigate();
   const [user, setUser] = useState()
   const [selectedChat, setSelectedChat] = useState()
   const [chats, setChats] = useState([]);
   const [notifications, setNotifications] = useState([]);
   useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('DoctorInfo')) 
    console.log(userInfo)
    console.log("dsfjsdfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    console.log(userInfo)
    setUser(userInfo)
    

  
  }, [Navigate])


    return (
        <ChatContext.Provider value={{user,setUser, selectedChat, setSelectedChat,chats,setChats,notifications,setNotifications}}>
        {children}
        </ChatContext.Provider>
    );
   

}

export const ChatState = () => {
    return useContext(ChatContext)
}

   
    export default ChatProvider;