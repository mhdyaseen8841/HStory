import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ user, handleFunction }) => {
  
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text> DR. {user.DocName}</Text>
        <Text fontSize="xs">
          <b>Specialised : </b>
         {user.Speciality}
        </Text>
        <Text fontSize="xs">
          <b>Hospital : </b>
          {user.Hospital}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;