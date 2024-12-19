import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCars";
import apiFunctions from "../fetchingData/fetchData";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchTopicsForArticles from "./SearchTopicsForArticles";

export default function ArticleList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get("p")) || 1;
  const [selectedItem, setSelectedItem] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [articlesPerPage, setArticlesPerPage] = useState(9);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const [error, setError] = useState("");

  const topic = searchParams.get("topic");

  const fetchArticles = () => {
    setLoading(true);
    apiFunctions
      .getAllArticles(currentPage, articlesPerPage, topic)
      .then((data) => {
        setError("");
        setArticles(data.articles);
        if (!topic) {
          setSelectedItem("");
        }
        if (data.articles.length < articlesPerPage) {
          setHasMoreArticles(false);
        } else {
          setHasMoreArticles(true);
        }
      })
      .catch((err) => {
        setError("This article does not exist");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, topic]);

  const handlePageChange = (newPage) => {
    if (!topic) {
      setSelectedItem("");
      navigate({
        pathname: "/articles",
        search: `?p=${newPage}`,
      });
    } else {
      navigate({
        pathname: "/articles",
        search: `?p=${newPage}&topic=${topic}`,
      });
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedItem(topic);
    if (topic) {
      navigate({
        pathname: "/articles",
        search: `?p=1&topic=${topic}`,
      });
    } else {
      setSelectedItem("");
      navigate({
        pathname: "/articles",
        search: `?p=1`,
      });
    }
  };

  if (isLoading) {
    return (
      <Box>
        <Text>Loading ...</Text>
      </Box>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <>
      <Box padding={3}>
        <SearchTopicsForArticles
          selectedItem={selectedItem}
          setSelectedItem={handleTopicChange}
        />
      </Box>
      <Flex wrap="wrap" gap={6} justify="center">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.title} />;
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
            onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Link>
        )}
      </Box>
    </>
  );
}
