import { Box, Container,Text,Tab,Tabs,TabList,TabPanels,TabPanel, Input, Button,useToast } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,


} from '@chakra-ui/react'

import React,{useEffect,useState} from 'react'
import { Avatar } from "@chakra-ui/avatar";
import axios from 'axios'
import ChatLoading from "../components/miscellaneous/ChatLoading";
import { Navbar } from "../components/miscellaneous/Navbar";
import { useNavigate } from 'react-router-dom';


function LoginPopup({open,close}) {
const Navigate = useNavigate()
  const toast = useToast()

  const submitOTP =async()=>{

    
    let doctor=JSON.parse(localStorage.getItem("DoctorInfo"))
    let token = doctor.token
    console.log(token);
  
 
if(!otp){
  toast({
    title: "Enter OTP! ",
    status: "error",
    duration: 5000,
    isClosable: true,
  })
    setLoading(false)
    return
}

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
console.log(config)
let  Reqdata = {
 otp : otp

}

try{

  const {data}=await axios.post('/api/doctor/validatePatient',Reqdata,config)
  if(data){
    toast({
      title: "OTP Verified! ",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    close()
    setLoading(false)
    Navigate('/doctor/prescription')
  }
}catch(err){
  localStorage.removeItem("patientId")

  toast({
    title: "WRONG OTP! ",
    status: "error",
    duration: 5000,
    isClosable: true,
  })
    setLoading(false)
    return
}



  }

  const [otp,setOtp] = useState('');
const [loading,setLoading] = useState(false)
  return (
    <>
      <Modal onClose={close} isOpen={open} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>OTP VALIDATION</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl id='otp' isRequired>

         <FormLabel>
         OTP
         </FormLabel>
         <InputGroup>
         <Input
         type="text"
         placeholder='Enter Your OTP'
         maxLength={6}
         onChange={(e)=>setOtp(e.target.value)}/>
         </InputGroup>
         </FormControl>

         <Button colorScheme="green" width="100%" style={{marginTop:15}} onClick={submitOTP} isLoading={loading}>
    Validate
    </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={close}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


function SelectPatient() {
   
    const toast = useToast()
    const Navigate = useNavigate();


const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [result,setResult] = useState(false)
    const [loading, setLoading] = useState(false);
    const [addDialog, setDialog] = useState();

    const handleClose = () => setOpen(false);


    const patienthandle = async (user)=>{
console.log(user)
    localStorage.setItem("patientId",user._id)

console.log(user.mobno)

     let doctor=JSON.parse(localStorage.getItem("DoctorInfo"))
      let token = doctor.token
      console.log(token);
    
   


      try{
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      let  Reqdata = {
         mobnum : user.mobno

        }
        const data = await axios.post(`http://localhost:5000/api/doctor/sendPatientOtp`,Reqdata,config)
        console.log(data);
        setOpen(true)
      }catch(error){
        toast({
          title: "Error Occured! ",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        })
      }
    }

    
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
            setResult(true)
        setLoading(true)
        
        const config = {
          // headers: {
          //   Authorization: `Bearer ${user.token}`,
          // },
        }
          const {data} = await axios.get(`/api/user?search=${search}`)
        
          setLoading(false)
          setSearchResults(data)
          console.log(data);
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
  
  return (
<>

    <Container
    display="flex"
   
    maxW='xl' centerContent>
        
<Box
 
display='flex'
justifyContent='center'
p={3}
bg={'white'}
w="100%"
m="40px 0 15px 0"
borderRadius="lg"
borderWidth="1px"
>
    
    <Text fontSize='4xl' fontFamily='work sans' color='black' cursor={'pointer'} onClick={()=> Navigate("/")}>
HStory
    </Text>
    
</Box>
<LoginPopup open={open} close={handleClose}/>
<Box display="flex" pb={2}   w="100%">
  <Input placeholder="Search by name or mobile number"
 value={search}
 onChange={(e)=> setSearch(e.target.value)}

  bg={'white'}
  mr={2}
  w="100%"
  />
  <Button  onClick={handleSearch} >Go</Button>
</Box>
{result?

<Box
display='flex'
flexDirection={'column'}
justifyContent='center'
p={3}
bg={'white'}
w="100%"
borderRadius="lg"
borderWidth="1px"
>

{loading ? (
<ChatLoading/>
):(
    searchResults.length === 0 ? (
        <Text>No user found</Text>
      ) : (
searchResults?.map(user =>(




<Box
 key={user._id}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mt={1}
      mb={1}
      borderRadius="lg"
      onClick={()=>{
      
        patienthandle(user)}
      }
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
         name={user.name}
       // src={user.pic}
      />
      <Box>
        <Text>  {user.name}</Text>
        
        <Text fontSize="xs">
          <b>Mob : </b>
          {user.mobno}
        </Text>
        <Text fontSize="xs">
          <b>Gender : </b>
          {user.gender}
        </Text>
      </Box>
    </Box>
    
    

))))
}
</Box>
:
<>
</>
}
</Container>
</>
  )
}

export default SelectPatient