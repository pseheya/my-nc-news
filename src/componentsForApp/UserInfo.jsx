import { Text, Button, Link } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContextProvider from "../UserContextProvider";
import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";

export default function UserInfo() {
  const { selectedUser, setSelectedUser } = useContext(
    UserContextProvider.UserContext
  );
  const { username } = useParams();

  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
      <Image
        objectFit="cover"
        maxW="200px"
        src={selectedUser.avatar_url}
        alt="Caffe Latte"
      />
      <Box>
        <Card.Body>
          <Card.Title mb="2">{selectedUser.name}</Card.Title>
          <Card.Description>Username: {selectedUser.username}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Link
            href="/articles"
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
            Read articles
          </Link>
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
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
