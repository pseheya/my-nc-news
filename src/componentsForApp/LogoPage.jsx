import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import apiFunction from "../fetchingData/fetchData";

import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import UserContextProvider from "../UserContextProvider";
import { useNavigate } from "react-router-dom";

export default function LogoPage() {
  const navigation = useNavigate();
  const { selectedUser, setSelectedUser } = useContext(
    UserContextProvider.UserContext
  );
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

  function hanldeSelectedUser([user]) {
    const selectedU = users.find((u) => u.username === user);
    setHandleUser(selectedU.username);
    setSelectedUser(selectedU);
  }

  console.log(user);

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      gap={4}
      display="flex"
      minW="250px"
      className="flex-box-for-log-in"
    >
      <SelectRoot
        collection={listOfUsers}
        value={[user?.username || ""]}
        onValueChange={(e) => {
          hanldeSelectedUser(e.value);
        }}
      >
        <SelectTrigger>
          <SelectValueText placeholder={user ? user : "Select user"} />
        </SelectTrigger>
        <SelectContent bg="black" borderRadius="md" shadow="lg">
          {users.map((user) => (
            <SelectItem item={user.username} key={user.username} color="white">
              {user.username}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <Button
        bg="gray.300"
        color="black"
        _hover={{ bg: "gray.400" }}
        _active={{ bg: "gray.500", transform: "scale(0.95)" }}
        px={4}
        borderRadius="md"
        onClick={() => {
          navigation(`/${user}`);
        }}
      >
        Log in
      </Button>
    </Flex>
  );
}
