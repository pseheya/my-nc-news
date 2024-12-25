import { Link, Box, Card, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import UserContextProvider from "../UserContextProvider";

export default function UserInfo() {
  const { selectedUser, setSelectedUser } = useContext(
    UserContextProvider.UserContext
  );
  const { username } = useParams();

  return (
    <Card.Root
      flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      maxW="xl"
      width="100%"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", md: "200px" }}
        width="100%"
        src={selectedUser.avatar_url}
        alt={`User avatar for ${selectedUser.username}`}
      />
      <Box flex="1" p={{ base: 4, md: 6 }}>
        <Card.Body>
          <Card.Title mb="2" fontSize={{ base: "lg", md: "xl" }}>
            {selectedUser.name}
          </Card.Title>
          <Card.Description fontSize={{ base: "sm", md: "md" }}>
            Username: {selectedUser.username}
          </Card.Description>
        </Card.Body>
        <Card.Footer
          mt="4"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap="2"
        >
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
            width={{ base: "100%", md: "auto" }}
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
            width={{ base: "100%", md: "auto" }}
          >
            Log out
          </Link>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
