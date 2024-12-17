import { Box, Text, Input, Button, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { useEffect, useState } from "react";
import apiFunction from "../fetchingData/fetchData";
import postFunctions from "../fetchingData/postData";

export default function LeaveCommentForArticle({
  article_id,
  setAddClick,
  setComments,
  setCurrentPage,
}) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmited] = useState("");
  const [newComment, setNewComments] = useState({
    username: "",
    body: "",
  });

  const handleCommentInput = (e) => {
    const { name, value } = e.target;
    setNewComments((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const postComment = () => {
    const username = newComment.username.trim();
    if (!newComment.username || !newComment.body) {
      setMessage("You need to enter your username and comment");
      return;
    }

    postFunctions
      .postCommentByArticleId(username, newComment.body, article_id)
      .then((newCommentData) => {
        setSubmited("Your comment has been submitted!");
        setMessage("");
        setAddClick(false);
        return newCommentData.comment;
      })
      .then((data) => {
        setComments((prevComments) => [...prevComments, data]);
      })
      .catch((err) => {
        setMessage(
          "Your username does not exist, you need to register to leave a comment."
        );
      });
  };

  return (
    <Box mt="4" p="4" borderBottom="1px solid lightgray">
      <Field label="Username" required errorText="This field is required">
        <Input
          name="username"
          value={newComment.username}
          placeholder="Enter your username"
          onChange={handleCommentInput}
        />
      </Field>
      <Field label="Comment" required errorText="Field is required">
        <Textarea
          value={newComment.body}
          name="body"
          placeholder="Enter your comment"
          required
          onChange={handleCommentInput}
        />
      </Field>
      <Box display="flex" gap="1" mt="2">
        <Button bg="grey" onClick={postComment}>
          Submit
        </Button>
      </Box>
      {message && (
        <Text mt="2" color="red.500">
          {message}
        </Text>
      )}
      {submitted && (
        <Text mt="2" color="green.500">
          {submitted}
        </Text>
      )}
    </Box>
  );
}
