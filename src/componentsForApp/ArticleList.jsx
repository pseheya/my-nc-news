import { Box, Flex } from "@chakra-ui/react";
import FetchAllArticles from "../fetchingData/fetchArticles";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCars";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    FetchAllArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <Flex wrap="wrap" gap={6} justify="center">
      {articles.map((article) => {
        return (
          <ArticleCard key={article.created_at} article={article}></ArticleCard>
        );
      })}
    </Flex>
  );
}
