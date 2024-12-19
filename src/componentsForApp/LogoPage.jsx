import { Box, Button, Input, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Field } from "../components/ui/field";
import apiFunction from "../fetchingData/fetchData";
import SignInPage from "./SignInPage";

export default function LogoPage() {
  const [logoInput, setLogoInput] = useState({
    username: "",
    name: "",
  });
  const [error, setError] = useState(false);
  const [users, setAllUsers] = useState([]);
  const [addedNewUser, setNewUser] = useState(false);

  const handleInputChange = (e) => {
    setLogoInput({ ...logoInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    apiFunction.getAllUsers().then((data) => {
      setAllUsers(data.users);
    });
  }, []);

  function logIn() {
    const existedUser = users.filter((user) => {
      user.username === addedNewUser.username;
    });
    if (!existedUser) {
      setError(true);
    } else {
      setNewUser(true);
    }
  }

  return (
    <Box
      bg="white"
      border="1px solid #000"
      borderRadius="8px"
      p={6}
      maxWidth="400px"
      mx="auto"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
    >
      <Box mb={4}>
        <Field
          label="Username"
          required
          errorText="This field is required"
          color="black"
        >
          <Input
            id="username"
            name="username"
            value={logoInput.username}
            placeholder="Enter your username"
            color="black"
            border="1px solid black"
            _focus={{ borderColor: "black" }}
            onChange={handleInputChange}
          />
        </Field>
      </Box>

      <Box mb={4}>
        <Field
          label="Name"
          required
          errorText="This field is required"
          color="black"
        >
          <Input
            id="name"
            name="name"
            value={logoInput.name}
            placeholder="Enter your name"
            color="black"
            border="1px solid black"
            _focus={{ borderColor: "black" }}
            onChange={handleInputChange}
          />
        </Field>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Link
          onClick={logIn}
          bg="grey"
          color="white"
          px={6}
          py={2}
          borderRadius="md"
          textAlign="center"
          display="inline-block"
          _hover={{ bg: "darkgrey", textDecoration: "none" }}
          _focus={{ boxShadow: "outline" }}
          href="#"
        >
          Log in
        </Link>
        {error && (
          <Text color="black" mt={2}>
            You are not registered or wrong information
          </Text>
        )}
        <Link
          bg="grey"
          color="white"
          px={6}
          py={2}
          borderRadius="md"
          textAlign="center"
          display="inline-block"
          _hover={{ bg: "darkgrey", textDecoration: "none" }}
          _focus={{ boxShadow: "outline" }}
          href="/sign-in"
        >
          Sign in
        </Link>
      </Box>
    </Box>
  );
}
