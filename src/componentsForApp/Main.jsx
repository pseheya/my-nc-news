import { Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ReadMore from "./ReadMore";
import LogoPage from "./LogoPage";
import UserInfo from "./UserInfo";

export default function Main() {
  return (
    <Routes>
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:article_id" element={<ReadMore />} />
      <Route path="/" element={<LogoPage />} />
      <Route path="/:username" element={<UserInfo />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
