import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import{react,useState,useEffect} from 'react'
    import {useNavigate} from 'react-router-dom'
    import axios from 'axios'
    import {
        useToast
      } from '@chakra-ui/react'
  
//   type ForgotPasswordFormInputs = {
//     email: string;
//   };
  
  export default function ForgotPasswordForm() {
    const [email,setEmail]=useState("");
const toast = useToast()
    const submitHandler=()=>{
     
        console.log(email);
if(email!=""){
    axios.post('http://localhost:5000/api/doctor/forgetpassword',{DocEmail:email})
    .then(res=>{
        console.log(res.data);
        toast({
            title: "Email sent",
            description: "Please check your email for reset link",
            status: "success",
            duration: 5000,
            isClosable: true,
            })
    })
    .catch(err=>{
        console.log(err);
        toast({
            title: "Error Occured",
            description: err.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            })
    })


    
    }else{
toast({
    title: "Email is required",
    description: "Please enter your email",
    status: "error",
    duration: 5000,
    isClosable: true,

})
    }
}
  
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}  >
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
                onChange={(e)=>setEmail(e.target.value)}

            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              
              onClick={submitHandler}
              >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }