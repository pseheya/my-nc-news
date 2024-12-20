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
      <Flex
        display="flex"
        justifyContent="flex-start"
        marginLeft="10%"
        marginBottom="1%"
        className="Container for Search Component"
      >
        <SearchTopicsForArticles
          selectedItem={selectedItem}
          setSelectedItem={handleTopicChange}
        />
      </Flex>
      <Flex
        wrap="wrap"
        gap={{ base: 2, md: 2 }}
        justify="center"
        maxWidth="100%"
        px={{ base: 2, md: 4 }}
        mx="auto"
        width="100%"
        height="auto"
        className="container for list of articles"
      >
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.title} />;
        })}
      </Flex>
      <Box
        display="flex"
        justifyContent="center"
        mt={{ base: 3, md: 4 }}
        gap={1}
        flexDirection={{ base: "column", sm: "row" }}
        width="100%"
        height="auto"
        className="Container for next or previous page"
      >
        {currentPage === 1 ? null : (
          <Link
            bg="grey"
            color="white"
            px={{ base: 4, md: 6 }}
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
            px={{ base: 4, md: 6 }}
            py={2}
            borderRadius="md"
            textAlign="center"
            position="flex"
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
