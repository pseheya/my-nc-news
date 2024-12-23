import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";

import { IconWithCreateIcon } from "./logo";
import { useContext } from "react";
import UserContextProvider from "../UserContextProvider";

export default function Header() {
  const { selectedUser, setSelectedUser } = useContext(
    UserContextProvider.UserContext
  );

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
        bgImage="url(https://thumbs.dreamstime.com/b/black-cracked-surface-grey-soil-texture-background-dark-dried-chopped-gray-earth-old-fissure-dark-ground-close-up-erosion-174469017.jpg)"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        color="white"
        padding={{ base: "0.5rem", md: "1rem" }}
        boxShadow="md"
      >
        <Flex justify="space-between" align="center" flexWrap="wrap">
          <Link href="/articles" gap={2}>
            <Flex align="center" gap="2">
              <IconWithCreateIcon />
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                color="white"
              >
                Nc-News!
              </Text>
            </Flex>
          </Link>

          <Flex align="center" gap="4" ml="auto">
            <Link
              href="/articles"
              bg="grey"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
              textAlign="center"
              display={{ base: "none", md: "inline-block" }}
              _hover={{ bg: "darkgrey", textDecoration: "none" }}
              _focus={{ boxShadow: "outline" }}
              role="button"
              gap={2}
            >
              Read Articles
            </Link>

            {selectedUser.username ? (
              <Link
                bg="grey"
                onClick={() => {
                  setSelectedUser({ username: "", name: "", avatar_url: "" });
                }}
                href="/"
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                textAlign="center"
                display="inline-block"
                _hover={{ bg: "darkgrey", textDecoration: "none" }}
                _focus={{ boxShadow: "outline" }}
                role="button"
              >
                Log out
              </Link>
            ) : (
              <Link
                href="/"
                bg="grey"
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                textAlign="center"
                display="inline-block"
                _hover={{ bg: "darkgrey", textDecoration: "none" }}
                _focus={{ boxShadow: "outline" }}
                role="button"
              >
                Log in
              </Link>
            )}
            {selectedUser ? (
              <Link href={`${selectedUser.username}`}></Link>
            ) : (
              <Link href="/"></Link>
            )}
            <Link href={`/user/${selectedUser.username}`}>
              <Avatar
                bg="white"
                color="grey"
                boxSize={{ base: "40px", md: "50px" }}
                src={selectedUser.avatar_url}
              />
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box marginTop="5rem" padding="1rem"></Box>
    </>
  );
}
