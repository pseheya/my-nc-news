import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-backend-project.onrender.com/api",
});

async function getAllArticles() {
  const response = await api.get("/articles");
  return response.data;
}

async function getArticleById(id) {
  const response = await api.get(`/articles/${id}`);
  return response.data;
}

async function getCommentsByArticleId(id) {
  const response = await api.get(`/articles/${id}/comments`);
  return response.data;
}

export default {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
};
