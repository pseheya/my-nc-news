import React, { createContext, useState, useMemo, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(() => {
    const savedUser = localStorage.getItem("selectedUser");
    return savedUser
      ? JSON.parse(savedUser)
      : { username: "", name: "", avatar_url: "" };
  });

  useEffect(() => {
    if (selectedUser.username) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem("selectedUser");
    }
  }, [selectedUser]);

  const value = useMemo(() => {
    return { selectedUser, setSelectedUser };
  }, [selectedUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default { UserContext, UserProvider };
