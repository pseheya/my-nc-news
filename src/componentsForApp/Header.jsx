import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Box
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        bg="teal.500"
        color="white"
        padding="1rem"
        boxShadow="md"
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">
            Welcome to nc-news!
          </Text>
          <Link to="/api/users/:username">
            <Avatar></Avatar>
          </Link>
        </Flex>
      </Box>
      <Box marginTop="80px" padding="1rem"></Box>
    </>
  );
}
