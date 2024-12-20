import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import apiFunction from "../fetchingData/fetchData";

export default function UserInfo() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useState(() => {
    apiFunction.getUserByUsername(username).then(() => {});
  }, []);
}
