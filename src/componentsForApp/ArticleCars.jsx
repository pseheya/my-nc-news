import { Button, Card, Flex, Grid, Image, Text } from "@chakra-ui/react";

export default function ArticleCard({ article }) {
  return (
    <Card.Root overflow="hidden" maxW="sm" borderWidth="1px" borderRadius="lg">
      <Image src={article.article_img_url} alt={article.title} />
      <Card.Body gap="2">
        <Card.Title>{article.title}</Card.Title>

        <Text textStyle="2l" fontWeight="medium" letterSpacing="tight">
          Author: {article.author}
        </Text>
        <Text>Topic: {article.topic}</Text>
        <Text>Posted: {article.created_at}</Text>
        <Text>Comments: {article.comment_count}</Text>
        <Text>Votes: {article.votes}</Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" background="grey">
          Add votes
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
