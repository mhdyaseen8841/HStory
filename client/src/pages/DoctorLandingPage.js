import React from 'react'
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import backgroundImage from '../images/DocImg.jpg'

const DoctorLandingPage = () => {
  return (
    <Box>
      <Flex alignItems='center' bg="#cccccc"  px={4} py={3}>
        <Heading fontSize="40px"  >History </Heading>
        <Spacer />
        <Button mr={'4'} variant="solid" colorScheme="blue"  >Prescription</Button>
          <Button variant="solid" colorScheme="blue">Chat</Button>
      </Flex>

      <Box backgroundImage={`url(${backgroundImage})`} backgroundSize='cover' height='645px' >
  <Box backgroundColor='rgba(0, 0, 0, 0.5)'  px={48} height='100%' display='flex' alignItems='center' justifyContent='center'>
    <Box px={18}>
      <Text color='white' textAlign='center'>
        <Heading as='h1' size='xl'>Welcome to your user landing page!</Heading>
        <Text fontSize='xl' mt={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique lobortis purus ac aliquam. Nam et elit euismod, feugiat nisi eu, maximus velit. Donec ac lectus at tortor facilisis dictum.</Text>
        <Flex justifyContent='center' mt={8}>
          <Button variant="solid" colorScheme="blue" mr={4}>Prescription</Button>
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