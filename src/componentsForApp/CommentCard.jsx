import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import deleteCommentByCommentId from "../fetchingData/deleteData";

export default function CommentCard({ comment, removeCommentFromList }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);

  function deleteComment() {
    deleteCommentByCommentId(comment.comment_id)
      .then(() => {
        setIsDeleted(true);
        setError(null);
        removeCommentFromList(comment.comment_id);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  }

  if (isDeleted) {
    return (
      <Box
        p="4"
        border="1px solid lightgray"
        borderRadius="md"
        boxShadow="sm"
        bg="white"
        mx="auto"
        mt="4"
        color="black"
      >
        <Text color="green.500">Comment deleted 🙂</Text>
      </Box>
    );
  }

  return (
    <Box
      p="4"
      border="1px solid lightgray"
      borderRadius="md"
      boxShadow="sm"
      bg="white"
      mx="auto"
      mt="4"
      color="black"
    >
      <Text fontWeight="bold" color="black">
        User: {comment.author}
      </Text>
      <Text color="black">{comment.body}</Text>
      <Text fontSize="sm" color="gray.500">
        {new Date(comment.created_at).toLocaleString()}
      </Text>
      <Text>Votes: {comment.votes}</Text>
      {error && <Text color="red.500">{error}</Text>}
      <Button bg="grey" onClick={deleteComment}>
        Delete comment
      </Button>
    </Box>
  );
}
