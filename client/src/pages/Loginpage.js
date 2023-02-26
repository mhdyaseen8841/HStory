import { Box, Container,Text,Tab,Tabs,TabList,TabPanels,TabPanel} from '@chakra-ui/react'
import React,{useEffect} from 'react'
import Login from '../components/Authentication/Login'
import { useNavigate } from 'react-router-dom'
import OtpLogin from '../components/Authentication/OtpLogin'
import { useLocation } from 'react-router-dom';
function Loginpage() {

  const location = useLocation();

  const Navigate = useNavigate();
useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if(userInfo){
    Navigate("/chat")
  }
}, [])

  return (
  <Container maxW='xl' centerContent>
<Box
display='flex'
justifyContent='center'
p={3}
bg={'white'}
w="100%"
m="40px 0 15px 0"
borderRadius="lg"
borderWidth="1px"
>
    <Text fontSize='4xl' fontFamily='work sans' color='black'>
HStory
    </Text>
    
</Box>
<Box bg='white' w="100%" p={4} borderRadius="lg" borderWidth="1px" color='black' >
<Text display='flex'
justifyContent='center' fontSize='3xl'  mb={2} fontFamily='work sans' color='black'>
Login
    </Text>
<Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">Password</Tab>
    <Tab width="50%">OTP</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login userData={location.state}/>
    </TabPanel>
    <TabPanel>
     <OtpLogin userData={location.state}/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>
    </Container>
  )
}

export default Loginpage