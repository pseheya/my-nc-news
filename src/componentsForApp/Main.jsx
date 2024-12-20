import { Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ReadMore from "./ReadMore";
import LogoPage from "./LogoPage";
import UserInfo from "./UserInfo";
import { useState } from "react";

export default function Main({ selectedUser, setSelectedUser }) {
  const user = selectedUser;
  return (
    <Routes>
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:article_id" element={<ReadMore />} />
      <Route
        path="/"
        element={
          <LogoPage
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        }
      />
      <Route path="/users/:username" element={<UserInfo user={user} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
