import React,{useEffect,useState} from 'react'
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import backgroundImage from '../images/DocImg.jpg'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarBadge, AvatarGroup,Wrap,WrapItem } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

const DoctorLandingPage = () => {
  const Navigate = useNavigate();
const [doctor, setDoctor] = useState('')
const  [docName, setDocName] = useState('')
  const prescriptionHandle = () => {
    Navigate('/doctor/selectpatient')
  }

  useEffect(() => {
    
    document.title = 'Doctor Dashboard'
    if(!localStorage.getItem("DoctorInfo")){
    
      Navigate('/')
    }else{
      
      
      
      
    }
   
  }, [])
  return (
    <Box>
      <Navbar/>

      <Box backgroundImage={`url(${backgroundImage})`} backgroundSize='cover' height='645px' >
  <Box backgroundColor='rgba(0, 0, 0, 0.5)'  px={48} height='100%' display='flex' alignItems='center' justifyContent='center'>
    <Box px={18}>
      <Text color='white' textAlign='center'>
        <Heading as='h1' size='xl'>Welcome to your Doctors Dashboard!</Heading>
        <Text fontSize='xl' mt={4}>Manage Your Patients easily by checking their Health History.</Text>
        <Flex justifyContent='center' mt={8}>
          <Button variant="solid" colorScheme="blue" mr={4} onClick={prescriptionHandle}>Prescription</Button>
          <Button variant="solid" colorScheme="blue">Chat</Button>
        </Flex>
      </Text>
    </Box>
  </Box>
</Box>



    </Box>
  )
}

export default DoctorLandingPage


{/* <HStack justify="flex-end">
<Button variant="solid" colorScheme="blue" mb={2}>
  Add
</Button>
</HStack> */}