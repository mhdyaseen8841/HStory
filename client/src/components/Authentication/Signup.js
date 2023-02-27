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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import './Signup.css';
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
  
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
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="mobile">
                    <FormLabel>Mobile</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel>email</FormLabel>
                    <Input type="email" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="gender">
                    <FormLabel>Gender</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Address</FormLabel>
                <Input type="email" />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel>District</FormLabel>
                    <Input type="email" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="gender">
                    <FormLabel>City</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel>State</FormLabel>
                    <Input type="email" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="gender">
                    <FormLabel>Pincode</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl  isRequired>
                    <FormLabel>Upload Valid ID Proof</FormLabel>
                    </FormControl>
                    <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                Upload CV
              </Button>
                 
             
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
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
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }