import { Box, Flex, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCars";
import apiFunctions from "../fetchingData/fetchData";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiFunctions
      .getAllArticles()
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
          <ArticleCard article={article} key={article.created_at}></ArticleCard>
        );
      })}
    </Flex>
  );
}
