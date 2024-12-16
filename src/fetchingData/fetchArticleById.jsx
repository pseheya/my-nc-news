export default function fetchArticleById(id) {
  return fetch(
    `https://my-nc-news-backend-project.onrender.com/api/articles/${id}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
