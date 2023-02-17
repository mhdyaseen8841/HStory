import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, HStack, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement,Button,useToast } from '@chakra-ui/react'
import axios from 'axios'
function Login() {

  const Navigate = useNavigate();
  const toast = useToast()
    const [email, setEmail] = useState();
 
    const [password, setPassword] = useState();
    const [Show, setShow] = useState(false);
 const [loading,setLoading]=useState(false);


const submitHandler =async (e) => {
      setLoading(true)
      if(!email || !password){
        toast({
          title: "Fill all the fields! ",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
          setLoading(false)
          return
      }

 try{
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
 }
 const {data} =await axios.post(
    "/api/user/login",
    {email,password},
    config
 )
 toast({
  title: "Registration Successful! ",
  status: "success",
  duration: 5000,
  isClosable: true,
})
localStorage.setItem("userInfo",JSON.stringify(data))
setLoading(false)
Navigate("/chats")


}
catch(err){
  toast({
    title: "Error Occured! ",
    description: err.response.data.message,
    status: "error",
    duration: 5000,
    isClosable: true,
  })
  setLoading(false)
  return
}


}
    
const handleClick = () => setShow(!Show);
  return (
    <VStack spacing='5px' color='black'>
      

        <FormControl id='email' isRequired>
            <FormLabel>
Email
            </FormLabel>
            <Input
            placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            />
        </FormControl>

        <FormControl id='password' isRequired>

       
<FormLabel>
Password
</FormLabel>
<InputGroup>
<Input
type={Show?"text":"password"}
placeholder='Enter Your Password'
value={password}
onChange={(e)=>setPassword(e.target.value)}/>

<InputRightElement width="4.5rem">
<Button h="1.75rem" size="sm" onClick={handleClick}>
{Show ? "Hide" : "Show"}
</Button>
</InputRightElement>


</InputGroup>
</FormControl>


        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}  isLoading={loading}>
    Login
    </Button>
    <Button colorScheme="red" width="100%" style={{marginTop:15}} onClick={()=>{
        setEmail("guest@example.com");
        setPassword("123456");
    }}
   >
   Get Guest User Credentials
    </Button>

    </VStack>
  )
}

export default Login