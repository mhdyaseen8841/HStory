import React,{useState} from 'react'
import { Stack, HStack, VStack, FormControl, FormLabel, Input,useToast, InputGroup, InputRightElement,Button } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signup() {
    const toast = useToast()
    const Navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic,setPic]=useState();
    const [Show, setShow] = useState(false);
  const [loading,setLoading]=useState(false);



const submitHandler = async (e) => {
    setLoading(true)
    if(!name || !email || !password || !confirmpassword ){
        toast({
            title: "Fill all the fields! ",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
          setLoading(false)
          return
    }
    if(password!==confirmpassword){
        toast({
            title: "Passwords don't match! ",
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
const {data} = await axios.post("/api/user",{name,email,password,pic},config)
toast({
    title: "Registration Successful! ",
    status: "success",
    duration: 5000,
    isClosable: true,
  })
  localStorage.setItem("userInfo",JSON.stringify(data))
  setLoading(false)
  Navigate("/chat")
    }catch(err){
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
const postDetails = (pic) => {
setLoading(true)
if(pic===undefined){
 toast({
                title: "Image Undefined",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
              setLoading(false)
              return;
    }
    if(pic.type==="image/jpeg" || pic.type==="image/png"){
 const data = new FormData()
 data.append("file",pic) 
 data.append("upload_preset","chat-app")
 data.append("cloud_name","dmgqvkhtp")

    fetch("https://api.cloudinary.com/v1_1/dmgqvkhtp/image/upload",{method:"post",body:data}).then((res)=>res.json()).then((data)=>{
        setPic(data.url.toString());
        console.log(pic);
        setLoading(false)
    }).catch((err)=>{
        console.log(err)
        setLoading(false)
    })
}else{
    toast({
        title: "Select an Image! ",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
      return;
}
}


const handleClick = () => setShow(!Show);
  return (
    <VStack spacing='5px' color='black'>
    <FormControl id='first-name' isRequired>
        <FormLabel>
Name
        </FormLabel>
        <Input
        placeholder='Enter Your Name'
        onChange={(e)=>setName(e.target.value)}/>
    </FormControl>

    <FormControl id='email1' isRequired>
        <FormLabel>
Email
        </FormLabel>
        <Input
        placeholder='Enter Your Email'
        onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>

    <FormControl id='Spassword' isRequired>

       
        <FormLabel>
Password
        </FormLabel>
        <InputGroup>
        <Input
        type={Show?"text":"password"}
        placeholder='Enter Your Password'
        onChange={(e)=>setPassword(e.target.value)}/>

<InputRightElement width="4.5rem">
<Button h="1.75rem" size="sm" onClick={handleClick}>
{Show ? "Hide" : "Show"}
</Button>
</InputRightElement>
       

</InputGroup>
    </FormControl>

    <FormControl id='cpassword' isRequired>

       
        <FormLabel>
Confirm Password
        </FormLabel>
        <InputGroup>
        <Input
        type={Show?"text":"password"}
       
        onChange={(e)=>setConfirmpassword(e.target.value)}/>

<InputRightElement width="4.5rem">
<Button h="1.75rem" size="sm" onClick={handleClick}>
{Show ? "Hide" : "Show"}
</Button>
</InputRightElement>
       

</InputGroup>
    </FormControl>


    <FormControl id='pic' >
        <FormLabel>
Upload Your Profile Picture
        </FormLabel>
        <Input
        type='file'
        p={1}
        accept='image/*'
        onChange={(e)=>postDetails(e.target.files[0])}/>
  
      
    </FormControl>
    <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
    SignUp
    </Button>

</VStack>
  )
}

export default Signup