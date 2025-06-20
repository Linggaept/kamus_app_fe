// components/SearchResult.tsx
import { useSearchStore } from "@/lib/useSearchStore";
import { useTermStore } from "@/lib/useTermStore";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";
import AccordionItem from "./AccordionItem";

export default function SearchResult() {
  const {
    search,
    history,
    result,
    isLoading,
    fetchResult,
    addToHistory,
    loadHistoryFromServer,
    deleteHistory,
    focus,
    setSearch,
  } = useSearchStore();

  const { terms, getAllTerms, page } = useTermStore();

  const showHistory = search.length === 0;

  const handleAddHistorytoSearch = (term: string) => {
    fetchResult(term);
    setSearch(term);
  };

  const handleClearHistoryItem = (id: number) => {
    deleteHistory(id);
    ToastAndroid.show("History item cleared", ToastAndroid.SHORT);
  };

  useEffect(() => {
    loadHistoryFromServer();
  }, [history]);

  useEffect(() => {
    getAllTerms(); // Fetch all dummy data once
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

  return (
    <View p="$4">
      <YStack p="$4" gap="$4">
        {showHistory ? (
          history.length > 0 && focus ? (
            history.map((item: { id: number; term: string }, index) => (
              <XStack key={index} items="center" justify="space-between">
                <TouchableOpacity
                  onPress={() => {
                    handleAddHistorytoSearch(item.term);
                  }}
                >
                  <Text color="#333">{item.term}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleClearHistoryItem(item.id);
                  }}
                >
                  <X size={20} color="red" />
                </TouchableOpacity>
              </XStack>
            ))
          ) : terms.length > 0 ? (
            terms.map((item, index) => (
              <AccordionItem
                term_id={item.term_id}
                key={index}
                title={item.term}
                content={item.definition}
              />
            ))
          ) : (
            <Text color="$black10">Belum ada histori pencarian</Text>
          )
        ) : filteredData.length > 0 ? (
          result.map((item, index) => (
            <AccordionItem
              term_id={item.term_id}
              key={index}
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
