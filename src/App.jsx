import { useState } from "react";
import "./App.css";
import Main from "./componentsForApp/Main";
import { Routes } from "react-router-dom";
import Header from "./componentsForApp/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Main></Main>
    </>
  );
}

export default App;
