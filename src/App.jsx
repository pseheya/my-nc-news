import "./App.css";
import Main from "./componentsForApp/Main";
import Header from "./componentsForApp/Header";
import { useState } from "react";

function App() {
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });

  if (selectedUser === undefined) {
    setSelectedUser({ username: "", name: "", avatar_url: "" });
  }
  return (
    <>
      <Header selectedUser={selectedUser} />
      <Main selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </>
  );
}

export default App;
