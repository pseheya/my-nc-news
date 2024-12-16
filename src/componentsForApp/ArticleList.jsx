import { Box, Button, Flex, Text } from "@chakra-ui/react";
import FetchAllArticles from "../fetchingData/fetchArticles";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCars";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FetchAllArticles()
      .then((data) => {
        setArticles(data.articles);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  return (
    <Flex wrap="wrap" gap={6} justify="center">
      {articles.map((article) => {
        return (
          <Box key={article.created_at}>
            <ArticleCard article={article}></ArticleCard>
          </Box>
        );
      })}
    </Flex>
  );
}
