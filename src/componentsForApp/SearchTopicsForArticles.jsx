import { Button, createListCollection, Box, Flex } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { useState, useEffect } from "react";
import apiFunction from "../fetchingData/fetchData";

export default function SearchTopicsForArticles({
  selectedItem,
  setSelectedItem,
}) {
  const [topics, setTopisc] = useState([]);
  const [isLoading, setLoadin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoadin(true);
    apiFunction
      .getAllTopics()
      .then((data) => {
        setTopisc(data.topics);
      })
      .then(() => {
        setLoadin(false);
      })
      .catch((err) => {
        setError("This topic does not exist!");
      });
  }, []);

  if (error) {
    <Text>{error}</Text>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChange = (value) => {
    setSelectedItem(value.toString());
  };

  const handleClear = () => {
    setSelectedItem("");
  };

  const listTopic = createListCollection({
    items: topics.map((topic) => ({
      label: topic.slug,
      value: topic.slug,
    })),
  });

  return (
    <Box
      padding={3}
      position="flex"
      width="100%"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Flex justify="space-between" align="center">
        <SelectRoot
          collection={listTopic}
          value={[selectedItem]}
          onValueChange={(e) => {
            setSelectedItem(e.value);
            handleChange(e.value);
          }}
        >
          <SelectTrigger>
            <SelectValueText
              placeholder={selectedItem ? selectedItem : "Select topic"}
            />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem item={topic.slug} key={topic.slug}>
                {topic.slug}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Button background="grey" onClick={handleClear}>
          Clear
        </Button>
      </Flex>
    </Box>
  );
}
