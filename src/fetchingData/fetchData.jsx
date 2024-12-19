import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-backend-project.onrender.com/api",
});

async function getAllArticles(page, limit, topic) {
  let url = new URL(
    "https://my-nc-news-backend-project.onrender.com/api/articles"
  );
  let params = new URLSearchParams(url.search);
  params.append("limit", limit);
  params.append("p", page);

  if (topic) {
    params.append("topic", topic);
  }
  url.search = params.toString();

  const response = await api.get(url.toString());
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

async function getAllUsers() {
  const response = await api.get(`/users`);
  return response.data;
}

async function getAllTopics() {
  const response = await api.get("/topics");

  return response.data;
}

export default {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  getAllUsers,
  getAllTopics,
};
