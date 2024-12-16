import { Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";

export default function Main() {
  return (
    <Routes>
      <Route path="/api/articles" element={<ArticleList />}></Route>
    </Routes>
  );
}
