import { Box, Container,Text,Tab,Tabs,TabList,TabPanels,TabPanel, Input, Button,useToast } from '@chakra-ui/react'
import React,{useEffect,useState} from 'react'
import { Avatar } from "@chakra-ui/avatar";
import axios from 'axios'
import ChatLoading from "../components/miscellaneous/ChatLoading";
import { Navbar } from "../components/miscellaneous/Navbar";
import { useNavigate } from 'react-router-dom';
function SelectAccountLogin() {
   
    const toast = useToast()
    const Navigate = useNavigate();


    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [result,setResult] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleSearch = async() => {
        if(!search){
          toast({
            title: "Please Enter Something in search! ",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left"
          })
          return;
        }
        
        try{
            setResult(true)
        setLoading(true)
        
        const config = {
          // headers: {
          //   Authorization: `Bearer ${user.token}`,
          // },
        }
          const {data} = await axios.get(`/api/user?search=${search}`)
        
          setLoading(false)
          setSearchResults(data)
          console.log(data);
        }catch(error){
          toast({
            title: "Error Occured! ",
            description: "Failed to search users! ",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          })
        }
          }
  
  return (
<>

    <Container
    display="flex"
   
    maxW='xl' centerContent>
        
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
    
    <Text fontSize='4xl' fontFamily='work sans' color='black' cursor={'pointer'} onClick={()=> Navigate("/")}>
HStory
    </Text>
    
</Box>

<Box display="flex" pb={2}   w="100%">
  <Input placeholder="Search by name or mobile number"
 value={search}
 onChange={(e)=> setSearch(e.target.value)}

  bg={'white'}
  mr={2}
  w="100%"
  />
  <Button  onClick={handleSearch} >Go</Button>
</Box>
{result?

<Box
display='flex'
flexDirection={'column'}
justifyContent='center'
p={3}
bg={'white'}
w="100%"
borderRadius="lg"
borderWidth="1px"
>

{loading ? (
<ChatLoading/>
):(
    searchResults.length === 0 ? (
        <Text>No user found</Text>
      ) : (
searchResults?.map(user =>(




<Box
 key={user._id}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mt={1}
      mb={1}
      borderRadius="lg"
      onClick={()=> Navigate('/login',{state:{userId:user._id,userName:user.name,mobno:user.mobno}})}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
         name={user.name}
       // src={user.pic}
      />
      <Box>
        <Text>  {user.name}</Text>
        
        <Text fontSize="xs">
          <b>Mob : </b>
          {user.mobno}
        </Text>
        <Text fontSize="xs">
          <b>Gender : </b>
          {user.gender}
        </Text>
      </Box>
    </Box>
    
    

))))
}
</Box>
:
<>
</>
}
</Container>
</>
  )
}

export default SelectAccountLogin