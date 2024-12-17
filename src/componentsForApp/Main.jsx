import { Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ReadMore from "./ReadMore";
import CommentsForArticle from "./CommentsForArticle";

export default function Main() {
  return (
    <Routes>
      <Route path="/articles" element={<ArticleList />}></Route>
      <Route path="/articles/:article_id" element={<ReadMore />}></Route>
      <Route
        path="/articles/:article_id/comments"
        element={<CommentsForArticle />}
      ></Route>
    </Routes>
  );
}
