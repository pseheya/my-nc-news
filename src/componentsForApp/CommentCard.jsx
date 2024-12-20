import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import deleteCommentByCommentId from "../fetchingData/deleteData";
import { useContext } from "react";
import UserContextProvider from "../UserContextProvider";

export default function CommentCard({ comment, removeCommentFromList }) {
  const { selectedUser } = useContext(UserContextProvider.UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);

  function deleteComment() {
    setIsDeleted(true);
    deleteCommentByCommentId(comment.comment_id)
      .then(() => {
        setIsDeleted(true);
        setError(null);
        removeCommentFromList(comment.comment_id);
      })

      .catch(() => {
        setIsDeleted(false);
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
      {comment.author === selectedUser.username ? (
        <Button bg="grey" onClick={deleteComment}>
          Delete comment
        </Button>
      ) : (
        <Button bg="grey" disabled>
          Delete comment
        </Button>
      )}
    </Box>
  );
}
