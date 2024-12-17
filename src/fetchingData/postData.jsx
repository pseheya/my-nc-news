import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-backend-project.onrender.com/api",
});

async function patchVotes(votes, article_id) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((response) => {
      console.log("votes updated in database");
      return response.data;
    });
}

async function postCommentByArticleId(username, comment, article_id) {
  const response = await api.post(`/articles/${article_id}/comments`, {
    username: username,
    body: comment,
  });

  return response.data;
}

export default { patchVotes, postCommentByArticleId };
