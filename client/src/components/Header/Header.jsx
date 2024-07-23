import { Box, Container, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import Logo from "../Logo/Logo";

const Header = () => {
 
  return (
    <Container py={2.5}  maxW='full' minW={'fit-content'} shadow={'sm'} >
      <Box as='div' maxW={'8xl'} marginInline={'auto'}>
        <HStack >
          <Logo/>
          <Heading as="h1" size={'xl'} fontStyle={'italic'} color={'gray.700'}> UsersBase</Heading>
        </HStack>  
     </Box>
    </Container>
  )
};

export default Header;
