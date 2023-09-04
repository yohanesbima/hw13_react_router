// Navbar.jsx
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="gray.900"
      color="white"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="italic">
            ThinkPad Store Book
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Navbar;
