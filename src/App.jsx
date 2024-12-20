import Main from "./componentsForApp/Main";
import Header from "./componentsForApp/Header";
import { useState } from "react";

import UserContextProvider from "./UserContextProvider";

function App() {
  return (
    <UserContextProvider.UserProvider>
      <Header />
      <Main />
    </UserContextProvider.UserProvider>
  );
}

export default App;
