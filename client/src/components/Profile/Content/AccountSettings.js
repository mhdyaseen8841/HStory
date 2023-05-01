import {useState,useEffect} from 'react';
import { FormControl, FormLabel, Grid, Input, Select,Box,Button } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";

function AccountSettings({data,updateSubmit}) {
  console.log(data)
  const [DocName, setDocName] = useState();
  const [MobNum, setMobNum] = useState();
  const [DocAddress, setDocAddress] = useState();
  const [City, setCity] = useState();
  const [State, setState] = useState();
  const [zip, setzip] = useState();

  useEffect(() => {
    setDocName(data ? data.DocName : "")
    setMobNum(data ? data.MobNum : "")
    setDocAddress(data ? data.DocAddress : "")
    setCity(data ? data.City : "")
    setState(data ? data.State : "")
    setzip(data ? data.zip : "")
  }, [data]);
  const toast = useToast()

  
  const clickHandle =()=>{
    console.log(DocName)
    if(!DocName || !MobNum || !DocAddress || !City || !State || !zip){
      toast({
        title: "not Empty fieled",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    let dat = {
      id: data._id,
      DocName:DocName,
      MobNum:MobNum,
      DocAddress:DocAddress,
      City:City,
      zip:zip
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
        <FormLabel>Doc Name</FormLabel>
        <Input 
        focusBorderColor="brand.blue" 
        type="text"  
        placeholder="Name"
        defaultValue={data ? data.DocName : ''}
        onChange={(e)=>{
          console.log(e.target.value)
          setDocName(e.target.value)}}/>
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          placeholder="Phone number"
          defaultValue={data ? data.MobNum : ''}
          onChange={(e)=>setMobNum(e.target.value)}
        />
      </FormControl>
      <FormControl id="emailAddress">
        <FormLabel>Email Address</FormLabel>
        <Input
        disabled
          focusBorderColor="brand.blue"
          type="email"
          placeholder="doctor@sample.com"
          defaultValue={data ? data.DocEmail : ''}
          
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>GENDER</FormLabel>
        <FormLabel disabled>{data ? data.gender : ''}</FormLabel>
      </FormControl>
      <FormControl id="country">
        <FormLabel>Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Doctor address"
          defaultValue={data ? data.DocAddress : ''}
          onChange={(e)=>setDocAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>City</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="city"
          defaultValue={data ? data.City : ''}
          onChange={(e)=>setCity(e.target.value)}
          
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>State</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="state"
          defaultValue={data ? data.State : ''}
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
