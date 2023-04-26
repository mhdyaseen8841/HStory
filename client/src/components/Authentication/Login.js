import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, HStack, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement,Button,useToast, Text, Flex, Box } from '@chakra-ui/react'
import axios from 'axios'
function Login(props) {

  const Navigate = useNavigate();
  const toast = useToast()
    const [email, setEmail] = useState();
    const [userName, setuserName] = useState(props.userData?props.userData.userName:'');

    const [password, setPassword] = useState('');
    const [Show, setShow] = useState(false);
 const [loading,setLoading]=useState(false);

const forgetPasswordHandler=()=>{

  if(!props.userData.userId){
    toast({
      title: "Some Error Occur! ",
      status: "error",
      duration: 5000,
      isClosable: true,
    })
      setLoading(false)
      return
  }
 axios.post("/api/user/forgetpassword",{id:props.userData.userId}).then((res)=>{
toast({
  title: "Email Sent! ",
  description: "Reset email has been sent to your registered email address",
  status: "success",
  duration: 5000,
  isClosable: true,

})
console.log(res);

 }).catch((err)=>{

  toast({
    title: "Error Occured! ",
    description: err.response.data.message,
    status: "error",
    duration: 5000,
    isClosable: true,


 })
 })

}
 
const submitHandler =async (e) => {
      setLoading(true)
      if(!password){
        toast({
          title: "Enter Password! ",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
          setLoading(false)
          return
      }
      if(!props.userData.userId){
        toast({
          title: "Some Error Occur! ",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
          setLoading(false)
          return
      }

 try{
  let id = props.userData.userId;
  
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
 }
 const {data} =await axios.post(
    "http://localhost:5000/api/user/login",
    {id,password},
    config
 )
 toast({
  title: "Login Successful! ",
  status: "success",
  duration: 5000,
  isClosable: true,
})
localStorage.setItem("patientInfo",JSON.stringify(data))
setLoading(false)
Navigate("/user")


}
catch(err){
  
  console.log(err);
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

useEffect(() => {
  if(!props.userData){
    Navigate("/")
  }
}, [])

  return (
    <VStack spacing='5px' color='black'>
      

        <FormControl id='email' >
            <FormLabel>
User Name
            </FormLabel>
            <Input
           
            disabled
            value={userName}
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

<Box  display="flex" justifyContent="flex-end" width="100%" >


<Text color={'#795CB2'} cursor={'pointer'} onClick={forgetPasswordHandler} >Forget Password?</Text>
</Box>
        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}  isLoading={loading}>
    Login
    </Button>
    <Button colorScheme="red" width="100%" style={{marginTop:15}} onClick={()=>Navigate("/register")}>
   
  Dont Have an Account? Register
    </Button>
    

    </VStack>
  )
}

export default Login