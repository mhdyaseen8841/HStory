import { createContext, useContext, useState, useEffect ,} from "react";
import { useNavigate } from 'react-router-dom'
const DoctorContext = createContext();



const DoctorProvider = ({ children }) => {
    const Navigate = useNavigate();
   const [user, setUser] = useState()
   const [selectedChat, setSelectedChat] = useState()
   const [chats, setChats] = useState([]);
   const [notifications, setNotifications] = useState([]);
  


    return (
        <DoctorContext.Provider value={{user,setUser, selectedChat, setSelectedChat,chats,setChats,notifications,setNotifications}}>
        {children}
        </DoctorContext.Provider>
    );
   

}

export const DoctorState = () => {
    return useContext(DoctorContext)
}

   
    export default ChatProvider;