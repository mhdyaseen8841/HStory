import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useLocation } from "react-router-dom";
  import{react,useState,useEffect} from 'react'
  import {useNavigate} from 'react-router-dom'
  import axios from 'axios'
  import {
      useToast
    } from '@chakra-ui/react'


  export default function ResetUserPasswordForm() {
    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");
    console.log(token)
    const Navigate=useNavigate();
    const toast = useToast()
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const submitHandler=()=>{
        console.log(token)
        if (password !== confirmPassword) {
           toast({
            title: "Passwords do not match",
            description: "Please enter the same password",
            status: "error",
            duration: 5000,
            isClosable: true,
            })
            return;
          }
        
          if (password.length < 6) {
            // password is too short, show an error message
            console.log("Password must be at least 6 characters long");
            toast({
                title: "Password must be at least 6 characters long",
                description: "Please enter a valid password",
                status: "error",
                duration: 5000,
                isClosable: true,
                })

            return;
          }
        
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          
          console.log(config)
          axios.post('http://localhost:5000/api/user/validateForgetPassword',{token,password} ,config).then((res) => {
            console.log(res.data)
            toast({
                title: "Password Reset",
                description: "go to login page",
                status: "success",
                duration: 5000,
                isClosable: true,
                })
                Navigate('/')
          }).catch((err) => {
            console.log(err)
            toast({
                title: "Error Occured",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
          })

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
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
         
     
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
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
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }