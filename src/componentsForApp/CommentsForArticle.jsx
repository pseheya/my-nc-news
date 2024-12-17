import { useEffect } from "react";
import apiFunctions from "../fetchingData/fetchData";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import LeaveCommentForArticle from "./LeaveCommentForArticle";

export default function CommentsForArticle() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [addCLick, setAddClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(10);
  const [hasMoreComments, setHasMoreComments] = useState(true);

  function handleClick() {
    setAddClick(!addCLick);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    apiFunctions
      .getCommentsByArticleId(article_id, currentPage, commentsPerPage)
      .then((data) => {
        if (data && data.comment) {
          setComments(data.comment);
        }
        if (data.comment.length < commentsPerPage) {
          setHasMoreComments(false);
        } else {
          setHasMoreComments(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id, currentPage]);

  if (isLoading) {
    return <Text>Loading, please wait...</Text>;
  }

  return (
    <Box
      mt="4"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      bg="gray.50"
      minHeight="400px"
    >
      <Box p="2" borderBottom="1px solid lightgray">
        <Button
          onClick={handleClick}
          bg="grey"
          borderBottom="1px solid lightgray"
        >
          Add Comment
        </Button>
        {addCLick && (
          <LeaveCommentForArticle
            article_id={article_id}
            setAddClick={setAddClick}
            setCommentsUpdated={setCommentsUpdated}
          />
        )}
      </Box>

      {comments.length > 0 ? (
        comments.map((comment) => (
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
        ))
      ) : (
        <Text>No comments available for this article.</Text>
      )}

      <Box display="flex" justifyContent="center" mt="4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          bg="grey"
        >
          Previous
        </Button>
        <Text mx="2">Page {currentPage}</Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          bg="grey"
          disabled={!hasMoreComments}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
