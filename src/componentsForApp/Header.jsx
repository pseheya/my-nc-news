import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { Link } from "react-router-dom";
import { IconWithCreateIcon } from "./logo";

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
        bgImage="url(https://thumbs.dreamstime.com/b/black-cracked-surface-grey-soil-texture-background-dark-dried-chopped-gray-earth-old-fissure-dark-ground-close-up-erosion-174469017.jpg)"
        color="white"
        padding="1rem"
        boxShadow="md"
      >
        <Flex justify="space-between" align="center">
          <Link to="/articles">
            <Flex align="center" gap="2">
              <IconWithCreateIcon />
              <Text fontSize="xl" fontWeight="bold" color="white">
                Nc-News!
              </Text>
            </Flex>
          </Link>

          <Link to="/users/:username">
            <Avatar bg="white" color="grey" />
          </Link>
        </Flex>
      </Box>
      <Box marginTop="80px" padding="1rem"></Box>
    </>
  );
}
