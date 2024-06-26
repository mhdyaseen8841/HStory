import React,{useEffect,useState} from 'react'
import { Box, Button, Flex, Heading, Spacer, Text,Menu,MenuButton,MenuItem,MenuDivider,MenuList ,Avatar } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import {ChevronDownIcon} from "@chakra-ui/icons"
import Profile from "../components/Profile/Profile"
import FullLogo from "../images/FullLogo.png";
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
const Navbar = () => {
  const Navigate = useNavigate()
  const [isOpen,setisOpen] = useState(false)
  const user= JSON.parse(localStorage.getItem("DoctorInfo"))
  const onClose=()=>{
    setisOpen(false);
  }
  const ProfileModal = ({open,close})=>{
    return(
        <Modal onClose={close} size="full" isOpen={open} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Profile/>
            </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  return (
    <div>
    <ProfileModal open={isOpen} close={onClose}/>
    <Flex alignItems="center" bg="#cccccc" px={4} py={3}>
      <Heading fontSize="40px">History </Heading>
      <Spacer />
      <Button
        mr={"4"}
        variant="solid"
        colorScheme="blue"
        onClick={() => {
          Navigate("/doctor/selectpatient");
        }}
      >
        Prescription
      </Button>
      <Button
        variant="solid"
        colorScheme="blue"
        onClick={() => {
          Navigate("/chat");
        }}
        mr={2}
      >
        Chat
      </Button>

      <Menu ml={2}>
        <MenuButton p={1} pl={2} as={Button} rightIcon={<ChevronDownIcon />}>
          <Avatar size="sm" cursor="pointer" name={user.DocName} src={user.pic} />
        </MenuButton>
        <MenuList>
        <MenuItem onClick={()=>{setisOpen(true); console.log(isOpen); console.log("profile click");}}>{user.DocName}</MenuItem>
          <MenuDivider />
          <MenuItem onClick={()=>{
            localStorage.clear();
            Navigate("/");
          }}>Logout</MenuItem>
        </MenuList>
      </Menu>
      
    </Flex>
    
    </div>
  );
};

export default Navbar;