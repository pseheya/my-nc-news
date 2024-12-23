import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button, Card, Image, Text, Flex, Box } from "@chakra-ui/react";
import apiFunction from "../fetchingData/fetchData";
import CommentsForArticle from "./CommentsForArticle";
import apiPostFunction from "../fetchingData/postData";
import UserContextProvider from "../UserContextProvider";

export default function ReadMore() {
  const { selectedUser } = useContext(UserContextProvider.UserContext);
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

    const votedArticles =
      JSON.parse(localStorage.getItem("votedArticles")) || {};
    if (votedArticles[selectedUser.username]?.[article_id]) {
      setHasVoted(true);
    }
  }, [article_id, selectedUser.username]);

  function handleVote(change) {
    setOptimisticVotes((prevVotes) => {
      return prevVotes + change;
    });

    setLoading(true);

    apiPostFunction
      .patchVotes(change, article.article_id)
      .then(() => {
        return apiFunction.getArticleById(article_id);
      })
      .then((data) => {
        setArticle(data.article);
        setOptimisticVotes(data.article.votes);
        setHasVoted(true);

        const votedArticles =
          JSON.parse(localStorage.getItem("votedArticles")) || {};
        if (!votedArticles[selectedUser.username]) {
          votedArticles[selectedUser.username] = {};
        }
        votedArticles[selectedUser.username][article_id] = true;
        localStorage.setItem("votedArticles", JSON.stringify(votedArticles));

        setLoading(false);
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
    <Card.Root
      maxW={{ base: "100%", md: "xl" }}
      overflow="hidden"
      boxShadow="md"
      borderRadius="md"
      margin="auto"
      padding={{ base: "1rem", md: "1.5rem" }}
    >
      <Image
        src={article.article_img_url}
        alt={article.title}
        objectFit="cover"
        width="100%"
        height={{ base: "200px", md: "300px" }}
        borderRadius="md"
      />
      <Card.Body gap="2" mt="2">
        <Card.Title fontSize={{ base: "lg", md: "xl" }}>
          {article.title}
        </Card.Title>
        <Card.Description
          fontSize={{ base: "sm", md: "md" }}
          textOverflow="ellipsis"
          noOfLines={{ base: 3, md: 5 }}
        >
          {article.body}
        </Card.Description>
        <Text
          textStyle="2l"
          fontWeight="medium"
          letterSpacing="tight"
          mt="2"
          fontSize={{ base: "sm", md: "md" }}
        >
          Author: {article.author}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }}>Topic: {article.topic}</Text>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Posted: {new Date(article.created_at).toLocaleString()}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Comments: {article.comment_count}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Votes: {optimisticVotes}
        </Text>
      </Card.Body>
      <Card.Footer gap="2" mt="3">
        <Flex
          gap="3"
          flexWrap="wrap"
          direction={{ base: "column", md: "row" }}
          align="flex-start"
        >
          {selectedUser.username && (
            <>
              {!hasVoted && (
                <Flex
                  gap="3"
                  width="100%"
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Button
                    background="gray"
                    width={{ base: "100%", md: "auto" }}
                    onClick={() => {
                      handleVote(1);
                    }}
                  >
                    Like article ❤️
                  </Button>
                  <Button
                    background="gray"
                    width={{ base: "100%", md: "auto" }}
                    onClick={() => {
                      handleVote(-1);
                    }}
                  >
                    Dislike article 💔
                  </Button>
                </Flex>
              )}
              {hasVoted && (
                <Flex gap="3" width="100%">
                  <Text fontSize="md" color="gray.700" fontWeight="bold">
                    You have voted for this article!
                  </Text>
                </Flex>
              )}
            </>
          )}

          <Button
            variant="ghost"
            background="gray"
            width={{ base: "100%", md: "auto" }}
            onClick={handleBack}
          >
            Main page
          </Button>
          {selectedUser.username ? (
            <>
              <Button
                variant="ghost"
                background="gray"
                width={{ base: "100%", md: "auto" }}
                onClick={handleComments}
              >
                {showComments ? "Hide comments" : "Comments"}
              </Button>
              {showComments && <CommentsForArticle />}{" "}
            </>
          ) : (
            <Text>Log in to leave comment and vote for article.</Text>
          )}
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
