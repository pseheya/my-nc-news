import { Button, Card, Image, Text, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReadMore from "./ReadMore";
import { useState } from "react";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  const handleToggleDetails = () => {
    navigate(`/articles/${article.article_id}`);
  };

  const url = `/articles/${article.article_id}`;

  return (
    <Card.Root
      overflow="hidden"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      flexGrow={1}
    >
      <Image src={article.article_img_url} alt={article.title} />
      <Card.Body gap="2">
        <Card.Title>{article.title}</Card.Title>

        <Text textStyle="2l" fontWeight="medium" letterSpacing="tight">
          Author: {article.author}
        </Text>
        <Text>Topic: {article.topic}</Text>
      </Card.Body>

      <Card.Footer gap="2">
        <Link
          href={url}
          bg="grey"
          color="white"
          px={4}
          py={2}
          borderRadius="md"
          textAlign="center"
          display="inline-block"
          _hover={{ bg: "darkgrey", textDecoration: "none" }}
          _focus={{ boxShadow: "outline" }}
          role="button"
        >
          Read More
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}
