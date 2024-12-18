import { Box, Flex, Text, Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCars";
import apiFunctions from "../fetchingData/fetchData";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(9);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const fetchArticles = () => {
    setLoading(true);
    apiFunctions
      .getAllArticles(currentPage, articlesPerPage)
      .then((data) => {
        setArticles(data.articles);
        if (data.articles.length < articlesPerPage) {
          setHasMoreArticles(false);
        } else {
          setHasMoreArticles(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  return (
    <>
      <Flex wrap="wrap" gap={6} justify="center">
        {articles.map((article) => {
          return (
            <ArticleCard article={article} key={article.title}></ArticleCard>
          );
        })}
      </Flex>
      <Box display="flex" justifyContent="center" mt="4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          bg="gray.500"
        >
          Previous
        </Button>
        <Text mx="2">Page {currentPage}</Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          bg="gray.500"
          disabled={!hasMoreArticles}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
