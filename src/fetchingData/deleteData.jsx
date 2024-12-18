import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-backend-project.onrender.com/api",
});

async function deleteCommentByCommentId(id) {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
}

export default deleteCommentByCommentId;
