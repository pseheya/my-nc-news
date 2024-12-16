import { Button, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReadMore from "./ReadMore";
import { useState } from "react";

export default function ArticleCard({ article }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleToggleDetails = () => {
    navigate(`/api/articles/${article.article_id}`);
  };

  return (
    <Card.Root overflow="hidden" maxW="sm" borderWidth="1px" borderRadius="lg">
      <Image src={article.article_img_url} alt={article.title} />
      <Card.Body gap="2">
        <Card.Title>{article.title}</Card.Title>

        <Text textStyle="2l" fontWeight="medium" letterSpacing="tight">
          Author: {article.author}
        </Text>
        <Text>Topic: {article.topic}</Text>
      </Card.Body>

      <Card.Footer gap="2">
        <Button onClick={handleToggleDetails} background="gray">
          {showDetails ? "Hide Information" : "Read More"}
        </Button>

        {showDetails && <ReadMore setShowDetails={setShowDetails} />}
      </Card.Footer>
    </Card.Root>
  );
}
