import { Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ReadMore from "./ReadMore";
import CommentsForArticle from "./CommentsForArticle";
import LogoPage from "./LogoPage";
import SignInPage from "./SignInPage";

export default function Main() {
  return (
    <Routes>
      <Route path="/articles" element={<ArticleList />}></Route>
      <Route path="/articles/:article_id" element={<ReadMore />}></Route>
      <Route
        path="/articles/:article_id/comments"
        element={<CommentsForArticle />}
      ></Route>
      <Route path="/" element={<LogoPage />}></Route>
      <Route path="/sign-in" element={<SignInPage />}></Route>
    </Routes>
  );
}
