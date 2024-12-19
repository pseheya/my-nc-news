import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCars";
import apiFunctions from "../fetchingData/fetchData";
import { useSearchParams } from "react-router-dom";

export default function ArticleList() {
  let [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("p")) || 1;
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const topic = searchParams.get("topic");

  const [articlesPerPage, setArticlesPerPage] = useState(9);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const fetchArticles = () => {
    setLoading(true);
    apiFunctions
      .getAllArticles(currentPage, articlesPerPage, topic)
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

  if (isLoading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  return (
    <>
      <Box></Box>
      <Flex wrap="wrap" gap={6} justify="center">
        {articles.map((article) => {
          return (
            <ArticleCard article={article} key={article.title}></ArticleCard>
          );
        })}
      </Flex>
      <Box display="flex" justifyContent="center" mt="4" gap={1}>
        {currentPage === 1 ? null : (
          <Link
            bg="grey"
            color="white"
            px={6}
            py={2}
            borderRadius="md"
            textAlign="center"
            display="inline-block"
            _hover={{ bg: "darkgrey", textDecoration: "none" }}
            _focus={{ boxShadow: "outline" }}
            href={`/articles?p=${currentPage - 1}`}
          >
            Previous
          </Link>
        )}
        {articles.length < articlesPerPage ? null : (
          <Link
            bg="grey"
            color="white"
            px={6}
            py={2}
            borderRadius="md"
            textAlign="center"
            display="inline-block"
            _hover={{ bg: "darkgrey", textDecoration: "none" }}
            _focus={{ boxShadow: "outline" }}
            href={`/articles?p=${currentPage + 1}`}
          >
            Next
          </Link>
        )}
      </Box>
    </>
  );
}
