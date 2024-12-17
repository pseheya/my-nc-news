import { useEffect } from "react";
import apiFunctions from "../fetchingData/fetchData";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

export default function CommentsForArticle() {
  const { article_id } = useParams();
  const [comments, setComments] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiFunctions
      .getCommentsByArticleId(article_id)
      .then((data) => {
        if (data && data.comment) {
          setComments(data.comment);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Text>Loading, please wait...</Text>;
  }

  if (comments) {
    return (
      <Box mt="4" p="4" borderWidth="1px" borderRadius="lg" bg="gray.50">
        <Box p="2" borderBottom="1px solid lightgray">
          <Button bg="grey" borderBottom="1px solid lightgray">
            Add Comment
          </Button>
        </Box>

        {comments.map((comment) => (
          <Box
            key={comment.comment_id}
            p="2"
            borderBottom="1px solid lightgray"
          >
            <Text fontWeight="bold">User: {comment.author}</Text>
            <Text>{comment.body}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(comment.created_at).toLocaleString()}
            </Text>
            <Text>Votes: {comment.votes}</Text>
          </Box>
        ))}
      </Box>
    );
  } else {
    return (
      <Box>
        <Box p="2" borderBottom="1px solid lightgray">
          <Button bg="grey">Add Comment</Button>
        </Box>
        <Text>No comments for this article</Text>
      </Box>
    );
  }
}
