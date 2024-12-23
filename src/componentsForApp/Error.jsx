import {
  Box,
  Button,
  Heading,
  Text,
  Center,
  Icon,
  Link,
} from "@chakra-ui/react";

export default function Error() {
  return (
    <Center height="100vh" flexDirection="column">
      <Box
        textAlign="center"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        maxWidth="400px"
        width="100%"
      >
        <Heading size="lg" color="gray.700" mb={2}>
          Oops! Page not found.
        </Heading>
        <Text color="gray.500" mb={6}>
          It seems you've reached a page that doesn't exist. Please check the
          URL or go back to the home page.
        </Text>
        <Link colorScheme="teal" size="lg" href="/" color="black">
          Go to Home
        </Link>
      </Box>
    </Center>
  );
}
