import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { Link } from "react-router-dom";
import { IconWithCreateIcon } from "./logo";
import { useContext } from "react";
import UserContextProvider from "../UserContextProvider";

export default function Header() {
  const { selectedUser } = useContext(UserContextProvider.UserContext);
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
        className="header box"
        maxHeight="18%"
      >
        <Flex
          justify="space-between"
          align="center"
          flexWrap="wrap"
          className="logo,profile avatar"
        >
          <Link to="/articles">
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

          <Link to={`${selectedUser.username}`}>
            <Avatar
              bg="white"
              color="grey"
              boxSize={{ base: "40px", md: "50px" }}
              src={selectedUser.avatar_url}
            />
          </Link>
        </Flex>
      </Box>
      <Box marginTop="5rem" padding="1rem"></Box>
    </>
  );
}
