import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image, Text, Flex, PopoverRoot } from "@chakra-ui/react";
import apiFunction from "../fetchingData/fetchData";
import CommentsForArticle from "./CommentsForArticle";

export default function ReadMore() {
  const navigate = useNavigate();
  const { article_id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [showComments, setShowComments] = useState(false);

  function handleBack() {
    navigate("/articles");
  }

  function handleComments() {
    setShowComments(!showComments);
  }

  useEffect(() => {
    setLoading(true);

    apiFunction
      .getArticleById(article_id)
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

  if (!article && !isLoading) {
    return null;
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
        <Text>Posted: {new Date(article.created_at).toLocaleString()}</Text>
        <Text>Comments: {article.comment_count}</Text>
        <Text>Votes: {article.votes}</Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Flex mt="3" gap="1" flexWrap="wrap">
          <Button background="gray">Vote</Button>
          <Button variant="ghost" background="gray" onClick={handleBack}>
            Main page
          </Button>

          <Button variant="ghost" background="gray" onClick={handleComments}>
            {showComments ? "Hide comments" : "Comments"}
          </Button>
          {showComments && <CommentsForArticle />}
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
