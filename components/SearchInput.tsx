import { Search } from "lucide-react-native";
import { Input, Button, XStack } from "tamagui";
import { Keyboard } from "react-native";
import { useSearchStore } from "@/lib/useSearchStore";
import { useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

export default function SearchInput() {
  const { search, setSearch, fetchResult, setFocus } = useSearchStore();

  // Debounced fetchResult, only recreated once
  const debouncedFetch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.trim()) {
          console.log(
            `[${new Date().toISOString()}] Debounced fetch for: "${query}"`
          );
          try {
            await fetchResult(query);
            console.log(
              `[${new Date().toISOString()}] Fetched results for: "${query}"`
            );
          } catch (error) {
            console.log(
              `[${new Date().toISOString()}] 🚫 Error searching for: "${query}"`,
              error
            );
          }
        }
      }, 500),
    []
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setSearch(text);
      debouncedFetch(text);
    },
    [setSearch, debouncedFetch]
  );


  const handleSubmit = useCallback(async () => {
    if (!search.trim()) return;
    console.log(`[${new Date().toISOString()}] Submit search for: "${search}"`);
    try {
      await fetchResult(search);
      console.log(
        `[${new Date().toISOString()}] ✅ Search submitted for: "${search}"`
      );
    } catch (error) {
      console.log(
        `[${new Date().toISOString()}] 🚫 Error on submit for: "${search}"`,
        error
      );
    }
    Keyboard.dismiss();
  }, [search, fetchResult]);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  return (
    <XStack items="center" space="$2" p="$4">
      <Input
        flex={1}
        size="$4"
        placeholder="Cari sesuatu..."
        color="#000"
        bg="#f8f8f8"
        placeholderTextColor="#888"
        borderColor="#f8f8f8"
        value={search}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        onPress={handleFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Button bg="#f8f8f8" pressStyle={{ opacity: 0.8 }} onPress={handleSubmit}>
        <Search size={20} color="#000" />
      </Button>
    </XStack>
  );
}
