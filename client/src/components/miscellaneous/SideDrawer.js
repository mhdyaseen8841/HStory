import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import React, { useState } from "react";
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChatState } from "../../Context/ChatProvider";
function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user} = ChatState();
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ sm: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" >
          Hstory
        </Text>
        <div>
          <Menu>
<MenuButton p={1}>
<BellIcon fontSize="2xl" m={1} />
</MenuButton>
<MenuList></MenuList>
          </Menu>

          <Menu>
<MenuButton p={1} as={Button} rightIcon ={<ChevronDownIcon/>}>
<Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
</MenuButton>
<MenuList>
  <ProfielModal></ProfielModal>
  <MenuItem>My Profile</MenuItem>
  <MenuDivider/>
  <MenuItem>Logout</MenuItem>
</MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
