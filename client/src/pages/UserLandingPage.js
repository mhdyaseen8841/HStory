import React,{useEffect,useState} from 'react'
import { Box, Button, Flex, Heading, Spacer, Text,Menu,MenuButton,MenuItem,MenuDivider,MenuList ,Avatar } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'
import { ChatState } from '../Context/ChatProvider'
import {ChevronDownIcon} from "@chakra-ui/icons"
import backgroundImage from '../images/DocImg.jpg'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Profile from '../components/Profile/Profile'
const ProfileModal = ({open,close})=>{
  return(
      <Modal onClose={close} size="full" isOpen={open} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{background:'#85ccc3'}}>
          <Profile/>
          </ModalBody>
        <ModalFooter sx={{background:'#85ccc3'}}>
          <Button onClick={close}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}


const UserLandingPage = () => {
  const [isOpen,setisOpen] = useState(false)
  const { patient} = ChatState()

  const Navigate = useNavigate();

  useEffect(() => {
    
   
    const patient = JSON.parse(localStorage.getItem('patientInfo'))
    
    console.log(patient)
    console.log("hehehehe")
    if(!patient){
Navigate('/')
    }
  }, [patient])

  return (
    <Box>
      <Flex alignItems='center' bg="#cccccc"  px={4} py={3}>
        <Heading fontSize="40px"  >History </Heading>
        <Spacer />
        <Button mr={'4'} variant="solid" onClick={()=>Navigate('/user/prescription')} colorScheme="blue" >Prescription</Button>
     
        <Menu ml={2}>
        <MenuButton p={1} pl={2} as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar size="sm" cursor="pointer" name={patient?.name} src={patient?.pic}  />
        </MenuButton>
        <MenuList>
        <MenuItem onClick={()=>{setisOpen(true); console.log(isOpen); console.log("profile click");}}>{patient?.name}</MenuItem>
          <MenuDivider />
          <MenuItem onClick={()=>{
            localStorage.clear();
            Navigate("/");
          }}>Logout</MenuItem>
        </MenuList>
      </Menu>
      </Flex>

      <Box backgroundImage={`url(${backgroundImage})`} backgroundSize='cover' height='645px' >
  <Box backgroundColor='rgba(0, 0, 0, 0.5)'  px={48} height='100%' display='flex' alignItems='center' justifyContent='center'>
    <Box px={18}>
      <Text color='white' textAlign='center'>
        <Heading as='h1' size='xl'>Welcome to your Health Story!</Heading>
        <Text fontSize='xl' mt={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique lobortis purus ac aliquam. Nam et elit euismod, feugiat nisi eu, maximus velit. Donec ac lectus at tortor facilisis dictum.</Text>
        <Flex justifyContent='center' mt={8}>
          <Button variant="solid" colorScheme="blue" onClick={()=>Navigate('/user/prescription')} mr={4}>Prescription</Button>
          <Button variant="solid" colorScheme="blue" onClick={()=>Navigate('/user/currentmedicines')} mr={4}>View Current Medicines</Button>
        </Flex>
      </Text>
    </Box>
  </Box>
</Box>



    </Box>
  )
}

export default UserLandingPage
