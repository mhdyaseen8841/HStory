import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
    useToast
    
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import { useFileUpload } from "use-file-upload";
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import './Signup.css';
  export default function Signup() {
    const toast = useToast();
    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [mobile,setMobile]=useState("");
  const [gender,setGender]=useState("");
  const [address,setAddress]=useState("");
  const [District,setDistrict]=useState("");
  const [State,setState]=useState("");
  const [pincode,setPincode]=useState("");
  const [city,setCity]=useState("");

  const [file, selectFiles] = useFileUpload()

const handleSubmit = ()=>{
  console.log(gender)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const passwordRegex = /^.{6,}$/;
  if ( !name || !email || !password || !mobile || !gender || !address || !District || !State || !pincode || !city) {
    // at least one value is missing
    toast({
      title: "Fill all the fields",
      status: "error",
      duration: 3000,
      isClosable: true,
  })
    return;
  }else if(!file){
    toast({
      title: "Please upload image",
      status: "error",
      duration: 3000,
      isClosable: true,
  })
  } else if (!emailRegex.test(email)) {
    toast({
      title: "Invalid email",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }else if (!mobileRegex.test(mobile)) {
    toast({
      title: "Invalid mobile number",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }else if (!passwordRegex.test(password)) {
    toast({
      title: "Password must contain at least 6 characters",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }
  else{

    console.log("All values are present");
    // const {name,email,password,pic,mobno,address,city,state,zip,district,gender,proof} = req.body;

    let data = {
      name: name,
      email: email,
      mobno:mobile,
      address: address,
      gender: gender,
      city: city,
      district: District,
     
      zip: pincode,
      state:State,
      password: password,
      pic: file.source,
    };


  
     axios.post(
      "http://localhost:5000/api/user",
      data
   ).then((res)=>{
   

    toast({
      title:"Account Created",
      description:"Login Again",
      status:"success",
      duration:3000,
      isClosable:true
    })
    Navigate('/selectaccount')

   }).catch((err)=>{
    console.log(err)
    toast({
      title: "error occured",
      description: err.message,
      status: "error",
      duration: 3000,
      isClosable: true,
  })
   })

  }
}
const handleNavigate=()=>{
  Navigate('/selectaccount')
}
    return (
      <Flex className="MyComponent"
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Hstory
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Sign Up to the Health Story 
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input   value={name}  onChange={(e)=>setName(e.target.value)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="mobile" isRequired>
                    <FormLabel>Mobile</FormLabel>
                    <Input   value={mobile} onChange={(e)=>setMobile(e.target.value)} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel>email</FormLabel>
                    <Input   value={email} onChange={(e)=>{
                      setEmail(e.target.value)
                    }} type="email" />
                  </FormControl>
                </Box>
                <Box>
                <RadioGroup id="gender" onChange={(e) => {
  console.log(e);
  setGender(e);
}}>
  <Stack direction="row">
    <Radio value="male">Male</Radio>
    <Radio value="female">Female</Radio>
    <Radio value="other">Other</Radio>
  </Stack>
</RadioGroup>
                </Box>
              </HStack>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Input   value={address} onChange={(e)=>setAddress(e.target.value)} type="text" />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="district" isRequired>
                    <FormLabel>District</FormLabel>
                    <Input   value={District} onChange={(e)=>setDistrict(e.target.value)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <Input   value={city} onChange={(e)=>setCity(e.target.value)} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="state" isRequired>
                    <FormLabel>State</FormLabel>
                    <Input   value={State} onChange={(e)=>setState(e.target.value)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="pincode" isRequired>
                    <FormLabel>Pincode</FormLabel>
                    <Input   value={pincode} onChange={(e)=>setPincode(e.target.value)} type="number" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl  isRequired>
                    <FormLabel>Upload Profile Picture</FormLabel>
                    </FormControl>
                    <Button onClick={() =>
          selectFiles({ accept: "image/*,application/pdf" }, ({ name, size, source, file }) => {
            console.log("Files Selected", { name, size, source, file });
          })
        } fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                Upload Picture
              </Button>
             
             {file?
             <Text fontSize='sm'>Picture uploaded*</Text>
                 
             :
             < ></>
                 
             
            }
              
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input   value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  
                  onClick={handleSubmit}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} onClick={handleNavigate}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }