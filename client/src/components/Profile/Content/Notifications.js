import {useState, useEffect} from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Button,
  Box
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";

function Notifications({data,updateSubmit}) {
  const [Hospital, setHospital] = useState();
  const [Speciality, setSpeciality] = useState();
  const [HospitalAddress, setHospitalAddress] = useState();
  const [Zip, setZip] = useState();
  console.log(data);

  useEffect(() => {
    setHospital(data ? data.Hospital : "")
    setSpeciality(data ? data.Speciality : "")
    setHospitalAddress(data ? data.HospitalAddress : "")
    setZip(data ? data.Zip : "")
  }, [data]);
  const toast = useToast()

  const clickHandle =()=>{
    if(!Hospital  || !Speciality || !HospitalAddress || !Zip){
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
      Hospital:Hospital,
      HospitalAddress:HospitalAddress,
      Speciality:Speciality,
      Zip:Zip

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
        <FormLabel>Registration Council</FormLabel>
        <Input 
        disabled
        focusBorderColor="brand.blue" 
        type="text"
        placeholder="Name"
        defaultValue={data ? data.RegistrationCouncil : ''}/>
      </FormControl>
      <FormControl id="phoneNumber">
        <FormLabel>Registration No</FormLabel>
        <Input
          disabled
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Phone number"
          defaultValue={data ? data.RegistrationNo : ''}
        />
      </FormControl>
      <FormControl id="emailAddress">
        <FormLabel>Current Hospital</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Hospital"
          defaultValue={data ? data.Hospital : ''}
          onChange={(e)=>setHospital(e.target.value)}
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>Speciality</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Speciality"
          defaultValue={data ? data.Speciality : ''}
          onChange={(e)=>setSpeciality(e.target.value)}
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Doctor address"
          defaultValue={data ? data.HospitalAddress : ''}
          onChange={(e)=>setHospitalAddress(e.target.value)}
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>ZIP</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="city"
          defaultValue={data ? data.Zip : ''}
          onChange={(e)=>setZip(e.target.value)}
        />
      </FormControl>
    </Grid>
    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
    <Button onClick={clickHandle}>Update</Button>
  </Box>
  </>
  )
}

export default Notifications
