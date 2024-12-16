import { useEffect, useState } from "react";
import fetchArticleById from "../fetchingData/fetchArticleById";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Button, Card, Image, Text } from "@chakra-ui/react";

export default function ReadMore() {
  const navigate = useNavigate();
  const { article_id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  function handleBack() {
    navigate("/api/articles");
  }

  useEffect(() => {
    if (!article_id) return;

    setLoading(true);

    fetchArticleById(article_id)
      .then((data) => {
        if (data && data.article) {
          setArticle(data.article);
        }
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card.Root maxW="xl" overflow="hidden">
      <Image src={article.article_img_url} alt={article.title} />
      <Card.Body gap="2">
        <Card.Title>{article.title}</Card.Title>
        <Card.Description>{article.body}</Card.Description>
        <Text textStyle="2l" fontWeight="medium" letterSpacing="tight" mt="2">
          Author: {article.author}
        </Text>
        <Text>Topic: {article.topic}</Text>
        <Text>Posted: {article.created_at}</Text>
        <Text>Comments: {article.comment_count}</Text>
        <Text>Votes: {article.votes}</Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" background="grey">
          Vote for this article
        </Button>
        <Button variant="ghost" background="grey" onClick={handleBack}>
          Go back to main page
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
