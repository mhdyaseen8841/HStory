import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useToast
  } from '@chakra-ui/react'
  import { useNavigate } from 'react-router-dom'
  import {
    IconButton,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
  } from '@chakra-ui/react'
  import axios from 'axios'
  import { forwardRef, useRef, useState } from 'react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'
  import { Logo } from './Logo'

  import { PasswordField } from './PasswordField'
 const App = () => 
    {
      const toast = useToast()
      const Navigate = useNavigate();
        const [show, setShow] = useState(false);
        const [email, setEmail] = useState('');
        const [loading,setLoading]=useState(false);


        const [password, setPassword] = useState('');
        const onClickReveal = ()=>{
          setShow(!show)
        }
      

        const validateEmail = (email) => {
          const re = /\S+@\S+\.\S+/;
          return re.test(email);
        };

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

          if(!email){
            toast({
              title: "Enter email! ",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
              setLoading(false)
              return
          }else{

            if (!validateEmail(email)) {
              toast({
                title: "Enter valid Email! ",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
                setLoading(false)
                return
            } 
          }

         
    
     try{
      
      const config = {
        headers: {
            "Content-Type": "application/json",
        },
     }
     const {data} =await axios.post(
        "/api/doctor/login",
        {"DocEmail":email,password},
        config
     )
     toast({
      title: "Login Successful! ",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    localStorage.setItem("DoctorInfo",JSON.stringify(data))
    setLoading(false)
    Navigate("/doctor")
    
    
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


        return(
            <Container
            maxW="lg"
            py={{
              base: '12',
              md: '24',
            }}
            px={{
              base: '0',
              sm: '8',
            }}
          >
            <Stack spacing="8">
              <Stack spacing="6">
                <Logo />
                <Stack
                  spacing={{
                    base: '2',
                    md: '3',
                  }}
                  textAlign="center"
                >
                  <Heading
                    size={{
                      base: 'xs',
                      md: 'sm',
                    }}
                  >
                    Log in to Doctor account
                  </Heading>
                  <HStack spacing="1" justify="center">
                    <Text color="muted">Don't have an account?</Text>
                    <Button variant="link" colorScheme="blue">
                      Sign up
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{
                  base: '0',
                  sm: '8',
                }}
                px={{
                  base: '4',
                  sm: '10',
                }}
                bg={{
                  base: 'transparent',
                  sm: 'bg-surface',
                }}
                boxShadow={{
                  base: 'none',
                  sm: 'md',
                }}
                borderRadius={{
                  base: 'none',
                  sm: 'xl',
                }}
              >
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                       />
                    </FormControl>
                    <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputRightElement>
                  <IconButton
                    variant="link"
                   
                    icon={show ? <HiEyeOff /> : <HiEye />}
                    onClick={onClickReveal}
                  />
                </InputRightElement>
                <Input
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  name="password"
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
              
                />
              </InputGroup>
            </FormControl>
                  </Stack>
                  <HStack justify="space-between">
                  
                    <Button variant="link" colorScheme="blue" size="sm" onClick={()=>Navigate('/doctor/forgetpass')}>
                      Forgot password?
                    </Button>
                  </HStack>
                  <Stack spacing="6">
                    <Button colorScheme='blue' onClick={submitHandler} >Sign in</Button>
                  
                      <Divider />
                     
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        )
    }
   
  

  export default App