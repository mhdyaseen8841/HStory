import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, HStack, VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement,Button,useToast } from '@chakra-ui/react'
import axios from 'axios'
function OtpLogin(props) {

  const Navigate = useNavigate();
  const toast = useToast()
    const [email, setEmail] = useState();
  const [mobNum, setMobNum] = useState(props.userData.mobno);

  const [otp,setOtp]= useState('');
    const [password, setPassword] = useState();
    const [ShowInput, setInputShow] = useState(false);
 const [loading,setLoading]=useState(false);

 const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

// const submitHandler =async (e) => {
//       setLoading(true)
//       if(!email || !password){
//         toast({
//           title: "Fill all the fields! ",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         })
//           setLoading(false)
//           return
//       }

//  try{
//   const config = {
//     headers: {
//         "Content-Type": "application/json",
//     },
//  }
//  const {data} =await axios.post(
//     "/api/user/login",
//     {email,password},
//     config
//  )
//  toast({
//   title: "Registration Successful! ",
//   status: "success",
//   duration: 5000,
//   isClosable: true,
// })
// localStorage.setItem("userInfo",JSON.stringify(data))
// setLoading(false)
// Navigate("/chats")


// }
// catch(err){
//   toast({
//     title: "Error Occured! ",
//     description: err.response.data.message,
//     status: "error",
//     duration: 5000,
//     isClosable: true,
//   })
//   setLoading(false)
//   return
// }


// }
    

useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
      setInputShow(false)
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);



const sendOTP = async () => {

    setLoading(true)

    try{
        let id = props.userData.userId;
        
        const config = {
          headers: {
              "Content-Type": "application/json",
          },
       }
       const {data} =await axios.post(
          "/api/user/login",
          {id},
          config
       )
       toast({
        title: data.otp+" Otp Send Successful! ",
        status: "success",
        duration: 5000,
        isClosable: true,
      })


      setInputShow(true)
    setLoading(false)
    
    setResendDisabled(true);

      console.log(data.otp);
       //after getting otp

    
      
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

const submitOTP = async () => {

    setLoading(true)

      if(!otp){
        toast({
          title: "Enter OTP! ",
          status: "warning",
          duration: 5000,
          isClosable: true,
        })
          setLoading(false)
          return
      }


      try{
        let id = props.userData.userId;
        let otplocal=otp;
        const config = {
          headers: {
              "Content-Type": "application/json",
          },
       }
       const {data} =await axios.post(
          "/api/user/otp",
          {id,otplocal},
          config
       )
      //  toast({
      //   title: "Registration Successful! ",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // })
      localStorage.setItem("userInfo",JSON.stringify(data))
      setLoading(false)
      Navigate("/chats")
      
      
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

  return (
    <VStack spacing='5px' color='black'>
      

        <FormControl id='mobnum' >
            <FormLabel>
Mobile Number
            </FormLabel>
            <Input
            disabled
        
            value={mobNum}
            />
        </FormControl>

        
        {ShowInput ? (
            <>
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
    Login
    </Button>

         </>
         ):(<>
         </>)
        
        }

    {
      resendDisabled ?  <Button colorScheme="blue" width="100%" style={{marginTop:15}} disabled={true} isLoading={loading}> Resend OTP in {countdown} seconds  </Button> : <Button colorScheme="blue" width="100%" style={{marginTop:15}}  onClick={sendOTP}  isLoading={loading}> Send OTP </Button>
        }
   


        
    {/* <Button colorScheme="red" width="100%" style={{marginTop:15}} onClick={()=>{
        setEmail("guest@example.com");
        setPassword("123456");
    }}
   >
   Get Guest User Credentials
    </Button> */}
 
    </VStack>
  )
}

export default OtpLogin