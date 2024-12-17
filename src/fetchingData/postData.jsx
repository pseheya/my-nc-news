import axios from "axios";

const api = axios.create({
  baseURL: "https://my-nc-news-backend-project.onrender.com/api",
});

async function postVotes(votes, article_id) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((response) => {
      console.log("votes updated in database");
      return response.data;
    });
}

export default { postVotes };
