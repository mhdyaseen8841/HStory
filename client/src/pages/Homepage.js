import { Box, Container,Text,Tab,Tabs,TabList,TabPanels,TabPanel} from '@chakra-ui/react'
import React,{useEffect} from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'
function Homepage() {

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
<Box bg='white' w="100%" p={4} borderRadius="lg" borderWidth="1px" color='black'>
<Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login/>
    </TabPanel>
    <TabPanel>
     <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>
    </Container>
  )
}

export default Homepage