import SearchInput from "@/components/SearchInput";
import SearchResult from "@/components/SearchResult";
import { Button, XStack, Text, ScrollView } from "tamagui";
import { useTermStore } from "@/lib/useTermStore";
import { useEffect } from "react";

export default function Meanings() {
  const { page, totalPages, setPage, getAllTerms } = useTermStore();

  useEffect(() => {
    getAllTerms(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <ScrollView bg="$white1" flex={1}>
      <SearchInput />
      <SearchResult />

      <XStack justify="center" items="center" space="$3" p="$4">
        <Button onPress={handlePrev} disabled={page === 1}>
          Prev
        </Button>
        <Text bg={"$black1"} color={"$white1"} p={"$2"} rounded={"$4"}>
          {page} / {totalPages}
        </Text>
        <Button onPress={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </XStack>
    </ScrollView>
  );
}
