import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image, Text, Flex, Box } from "@chakra-ui/react";
import apiFunction from "../fetchingData/fetchData";
import CommentsForArticle from "./CommentsForArticle";
import apiPostFunction from "../fetchingData/postData";

export default function ReadMore() {
  const navigate = useNavigate();
  const { article_id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [optimisticVotes, setOptimisticVotes] = useState(0);
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  function handleBack() {
    navigate(-1);
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
          setOptimisticVotes(data.article.votes);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  function handleVote(change) {
    setOptimisticVotes((prevVotes) => {
      return prevVotes + change;
    });

    apiPostFunction
      .patchVotes(change, article.article_id)
      .then(() => {
        return apiFunction.getArticleById(article_id);
      })
      .then((data) => {
        setArticle(data.article);
        setOptimisticVotes(data.article.votes);
        setHasVoted(true);
      })
      .catch((err) => {
        setError(err);
        setOptimisticVotes((prevVotes) => {
          return prevVotes - change;
        });
      });
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!article && !isLoading) {
    return (
      <Box>
        <Text>This article does not exist</Text>
      </Box>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
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
        <Text>Votes: {optimisticVotes}</Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Flex mt="3" gap="1" flexWrap="wrap">
          {!hasVoted && (
            <>
              <Button
                background="gray"
                onClick={() => {
                  handleVote(1);
                }}
              >
                Like article ❤️
              </Button>
              <Button
                background="gray"
                onClick={() => {
                  handleVote(-1);
                }}
              >
                Dislike article 💔
              </Button>
            </>
          )}

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
