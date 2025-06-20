import { useSearchStore } from "@/lib/word/useSearchStore";
import { useTermStore } from "@/lib/word/useTermStore";
import { useEffect } from "react";
import { Text, View, YStack, Button } from "tamagui";
import AccordionItem from "./AccordionItem";
import { useRouter } from "expo-router";

export default function SearchResultWord() {
  const router = useRouter();

  const {
    search,
    result,
    fetchResult,
  } = useSearchStore();

  const { terms, getAllTerms } = useTermStore();

  const handleSeeMoreMeanings = () => {
    router.replace("/(tabs)/books");
  };

  useEffect(() => {
    getAllTerms(); // fetch dummy data once
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      fetchResult(search);
    }
  }, [search]);

  const filteredData = terms.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  const showDummy = search.trim().length === 0;

  return (
    <View  flex={1} items={"center"} justify={"center"} width={"100%"} >
      <YStack width={"80%"} gap={"$4"}>
        {showDummy ? (
          <View>
            <YStack gap="$4">
              <Text
                fontSize="$10"
                fontWeight="bold"
                color="#000"
                items="center"
                text={"center"}
              >
                Word
              </Text>
              <Text fontSize="$4" color="#000" items="center" text={"center"} mx={"auto"} width={"80%"}>
                n. (w3:d) a single unit of language that means something and can be spoken or written.
              </Text>
              <Button onPress={handleSeeMoreMeanings} width={"80%"} mx={"auto"}>
                See more meanings
              </Button>
            </YStack>
          </View>
        ) : filteredData.length > 0 ? (
          result.map((item, index) => (
            <AccordionItem
              key={index}
              term_id={item.term_id}
              title={item.term}
              content={item.definition}
            />
          ))
        ) : (
          <Text color="$black10">Tidak ditemukan hasil untuk "{search}"</Text>
        )}
      </YStack>
    </View>
  );
}
