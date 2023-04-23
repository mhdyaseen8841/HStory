import { createContext, useContext, useState, useEffect ,} from "react";
import { useNavigate } from 'react-router-dom'
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const Navigate = useNavigate();
   const [user, setUser] = useState()
   const [patient, setPatient] = useState()
   const [selectedChat, setSelectedChat] = useState()
   const [chats, setChats] = useState([]);
   const [notifications, setNotifications] = useState([]);
   useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('DoctorInfo')) 
    console.log(userInfo)
    console.log("dsfjsdfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    console.log(userInfo)
    setUser(userInfo)
    console.log(localStorage.getItem('patientInfo'))
    const patientInfo = JSON.parse(localStorage.getItem('patientInfo'))
    console.log("aaaaaaaaaaaaaaaaaaaaaaa")
    console.log(patientInfo)
    if(patientInfo){
        setPatient(patientInfo)
    }
    

  
  }, [Navigate])


    return (
        <ChatContext.Provider value={{user,setUser,patient, selectedChat, setSelectedChat,chats,setChats,notifications,setNotifications}}>
        {children}
        </ChatContext.Provider>
    );
   

}

export const ChatState = () => {
    return useContext(ChatContext)
}

   
    export default ChatProvider;