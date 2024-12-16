import { Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ReadMore from "./ReadMore";

export default function Main() {
  return (
    <Routes>
      <Route path="/api/articles" element={<ArticleList />}></Route>
      <Route path="/api/articles/:article_id" element={<ReadMore />}></Route>
    </Routes>
  );
}
