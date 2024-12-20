import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiFunction from "../fetchingData/fetchData";

import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";

export default function LogoPage({ selectedUser, setSelectedUser }) {
  const [users, setAllUsers] = useState([]);
  const [user, setHandleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiFunction
      .getAllUsers()
      .then((data) => {
        setAllUsers(data.users);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Text>Loading, pleace wait..</Text>;
  }

  const listOfUsers = createListCollection({
    items: users.map((user) => ({
      label: user.name,
      value: user.username,
    })),
  });

  function hanldeSelectedUser(user) {
    const selectedU = users.filter((u) => {
      return u.username === user[0];
    });
    setSelectedUser(...selectedU);
  }

  return (
    <Box
      padding={6}
      bg="white"
      borderRadius="lg"
      shadow="lg"
      width="fit-content"
      mx="auto"
    >
      <Flex justify="center" align="center" direction="row" gap={4}>
        <SelectRoot
          collection={listOfUsers}
          value={[user?.username || ""]}
          onValueChange={(e) => {
            setHandleUser(e.value);
            hanldeSelectedUser(e.value);
          }}
        >
          <SelectTrigger>
            <SelectValueText
              width="200px"
              placeholder={user ? user : "Select user"}
            />
          </SelectTrigger>
          <SelectContent
            bg="black"
            borderRadius="md"
            shadow="lg"
            minWidth="200px"
          >
            {users.map((user) => (
              <SelectItem item={user.username} key={user.username}>
                {user.username}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Link
          width="100%"
          bg="gray.300"
          color="black"
          _hover={{ bg: "gray.400" }}
          _active={{ bg: "gray.500", transform: "scale(0.95)" }}
          px={4}
          height="35px"
          borderRadius="md"
          href={`/users/${user?.username || ""}`}
        >
          Log in
        </Link>
      </Flex>
    </Box>
  );
}
