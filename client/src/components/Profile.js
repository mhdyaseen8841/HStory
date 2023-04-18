import { Grid, GridItem, Flex, Box, Text,Avatar } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
const Profile = () => {
  const bShadow = { boxShadow: "0 0 5px #555", borderRadius: 5 };
  return (
    <Grid
      h="300px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={4}
    >
        <GridItem rowSpan={1}  colSpan={1} sx={{justifyContent:"center", alignItem:"center"}}>
            <Avatar size="3xl" name="user" src='https://bit.ly/dan-abramov' /> 
        </GridItem>
      <GridItem rowSpan={1} colSpan={3} sx={bShadow}>
        <HStack justifyContent="space-between" p={3}>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>Name :</Text>
            <Text fontSize="xl" >username </Text>
          </HStack>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>Mobile :</Text>
            <Text fontSize="xl">+91000000000 </Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between" p={3}>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>gender :</Text>
            <Text fontSize="xl">male </Text>
          </HStack>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>email :</Text>
            <Text fontSize="xl">sample@gmail.com </Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between" p={3}>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>city :</Text>
            <Text fontSize="xl">city </Text>
          </HStack>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>State :</Text>
            <Text fontSize="xl">kerala </Text>
          </HStack>
          <HStack spacing="12px">
            <Text fontSize="xl" fontWeight={500}>ZIP :</Text>
            <Text fontSize="xl">123456 </Text>
          </HStack>
        </HStack>
      </GridItem>
      <GridItem rowSpan={5} colSpan={2} sx={bShadow}></GridItem>
      <GridItem rowSpan={5} colSpan={2} sx={bShadow}></GridItem>
    </Grid>
  );
};
export default Profile;
