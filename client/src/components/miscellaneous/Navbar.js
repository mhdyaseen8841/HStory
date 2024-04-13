import { Box, Flex, Heading,Image } from "@chakra-ui/react";
import React from "react";
import FullLogo from "../../images/FullLogo.png";
export const Navbar = () => {
  return (
    <Flex bg=" transparent"  py="3" >
      {/* <Heading fontSize="40px" >Hstory </Heading> */}
      <Image    boxSize='100px' src={FullLogo} alt='Dan Abramov' />

    </Flex>
  );
};
