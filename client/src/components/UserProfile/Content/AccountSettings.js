import {useState,useEffect} from 'react';
import { FormControl, FormLabel, Grid, Input, Select,Box,Button } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";

function AccountSettings({data,updateSubmit}) {
  console.log(data)
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobno, setmobno] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [ district,setDistrict]= useState();
  const [zip, setzip] = useState();
const [address,setAddress]=useState();

  



  useEffect(() => {
    setName(data ? data.name : "")
    setmobno(data ? data.mobno : "")
    setEmail(data ? data.email : "")
    setCity(data ? data.city : "")
    setState(data ? data.state : "")
    setzip(data ? data.zip : "")
    setDistrict(data ? data.district: "")
    setAddress(data ? data.address: "")
  }, [data]);
  const toast = useToast()

  
  const clickHandle =()=>{
    console.log(name)
    console.log(email)
    console.log(mobno)
    console.log(address)
    console.log(city)
    console.log(state)
    console.log(zip)
    console.log(district)

    if(!name || !email || !mobno || !address || !state || !zip  || !city  || !district  ){
      toast({
        title: "not Empty fieled",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const mobNumRegex = /^[0-9]{10}$/; // regex pattern for 10 digit phone number
if (!mobNumRegex.test(mobno)) {
  toast({
    title: "Invalid mobile number",
    status: "error",
    duration: 5000,
    isClosable: true,
  });
  return;
}
    let dat = {
      id: data._id,
      name:name,
      email:email,
      mobno:mobno,
      address:address,
      city:city,
      zip:zip,
      district:district,
      state:state

    }
    updateSubmit(dat)
  }
  return (
    <>
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>Name</FormLabel>
        <Input 
        focusBorderColor="brand.blue" 
        type="text"  
        placeholder="Name"
        defaultValue={data ? data.name : ''}
        onChange={(e)=>{
          console.log(e.target.value)
          setName(e.target.value)}}/>
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="Phone number"
          defaultValue={data ? data.mobno : ''}
          onChange={(e)=>setmobno(e.target.value)}
        />
      </FormControl>
      <FormControl id="emailAddress">
        <FormLabel>Email Address</FormLabel>
        <Input
        
          focusBorderColor="brand.blue"
          type="email"
          placeholder="@sample.com"
          defaultValue={data ? data.email : ''}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="address">
        <FormLabel>Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder=" address"
          defaultValue={data ? data.address : ''}
          onChange={(e)=>setAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="district">
        <FormLabel>District</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="District"
          defaultValue={data ? data.district : ''}
          onChange={(e)=>setDistrict(e.target.value)}
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="city"
          defaultValue={data ? data.city : ''}
          onChange={(e)=>setCity(e.target.value)}
          
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>State</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="state"
          defaultValue={data ? data.state : ''}
          onChange={(e)=>setState(e.target.value)}

        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>ZIP</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Zip"
          defaultValue={data ? data.zip : ''}
          onChange={(e)=>setzip(e.target.value)}

        />
      </FormControl>
    </Grid>
    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
    <Button  onClick={clickHandle}>Update</Button>
  </Box>
  </>
  )
}

export default AccountSettings
