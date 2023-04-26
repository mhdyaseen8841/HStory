import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Flex,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

function Notifications({data}) {
  console.log(data);
  return (
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
          type="tel"
          placeholder="Phone number"
          defaultValue={data ? data.RegistrationNo : ''}
        />
      </FormControl>
      <FormControl id="emailAddress">
        <FormLabel>Current Hospital</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="doctor@sample.com"
          defaultValue={data ? data.Hospital : ''}
        />
      </FormControl>
      <FormControl id="city">
        <FormLabel>Speciality</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="doctor@sample.com"
          defaultValue={data ? data.Speciality : ''}
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="Doctor address"
          defaultValue={data ? data.HospitalAddress : ''}
        />
      </FormControl>
      <FormControl id="country">
        <FormLabel>ZIP</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          placeholder="city"
          defaultValue={data ? data.Zip : ''}
        />
      </FormControl>
    </Grid>
  )
}

export default Notifications
