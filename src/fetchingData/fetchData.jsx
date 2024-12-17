import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-backend-project.onrender.com/api",
});

async function getAllArticles(page, limit) {
  const response = await api.get(`/articles?limit=${limit}&p=${page}`);
  return response.data;
}

async function getArticleById(id) {
  const response = await api.get(`/articles/${id}`);
  return response.data;
}

async function getCommentsByArticleId(id, page, limit) {
  const response = await api.get(
    `/articles/${id}/comments?limit=${limit}&p=${page}`
  );
  return response.data;
}
export default {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
};
