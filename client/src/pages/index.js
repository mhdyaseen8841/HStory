import React from "react";
import {
  Box,
  Center,
  Text,
  Flex,
  Button,
  Image,
  Heading,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import { Navbar } from "../components/miscellaneous/Navbar";
import { useNavigate } from 'react-router-dom';


function Landing() {

  const Navigate = useNavigate();

 function patientLogin  () {

    Navigate("/selectaccount")
  }

  return (
    <>
      <Box bg="#cfeeea">
        <Navbar />
        <Flex color="black" flexDir={{ sm: "column", lg: "row" }} minH="100vh">
          <Center flexDir="column" w="100%" p="10">
            <Box w="500px">
              <Heading fontSize="3xl" textAlign="center">
                All doctors treat, but a good doctor lets nature heal.
              </Heading>
            </Box>
            <Flex mt="40px">
              <Box mr="40px">
                <Text fontSize="xl">For Doctors</Text>
               
                <Popover>
  <PopoverTrigger>
   
  <Button colorScheme="teal" mt="10px" >
                  Click Here
                </Button>
  </PopoverTrigger>
  <PopoverContent width='160px'  color='white' bg='blue.800' borderColor='blue.800'>
    <PopoverArrow bg='blue.800' />
    
    <PopoverHeader pt={4} fontWeight='bold' border='0'>Authentification</PopoverHeader>
    <PopoverBody >
    <ButtonGroup size='sm'>
    <Button  colorScheme='blue' >Signup</Button>
    <Button colorScheme='green' >Login</Button>
    </ButtonGroup>
    </PopoverBody>
  </PopoverContent>
</Popover>


              </Box>
              <Box>
                <Text fontSize="xl">For Patients</Text>
                <Popover>
  <PopoverTrigger>
   
  <Button colorScheme="teal" mt="10px" >
                  Click Here
                </Button>
  </PopoverTrigger>
  <PopoverContent width='160px'  color='white' bg='blue.800' borderColor='blue.800'>
    <PopoverArrow bg='blue.800' />
    
    <PopoverHeader pt={4} fontWeight='bold' border='0'>Authentification</PopoverHeader>
    <PopoverBody >
    <ButtonGroup size='sm'>
    <Button  colorScheme='blue' >Signup</Button>
    <Button colorScheme='green' onClick={patientLogin} >Login</Button>
    </ButtonGroup>
    </PopoverBody>
  </PopoverContent>
</Popover>

               
              </Box>
            </Flex>
          </Center>
          <Center>
            <Image
              src="https://img.freepik.com/free-vector/health-professional-team_52683-36023.jpg?w=2000"
              alt="Dan Abramov"
            />
          </Center>
        </Flex>
      </Box>
    </>
  );
}

export default Landing;
