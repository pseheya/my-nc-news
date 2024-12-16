export default function FetchAllArticles() {
  return fetch("https://my-nc-news-backend-project.onrender.com/api/articles")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
