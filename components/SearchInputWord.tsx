import { Search } from "lucide-react-native";
import { Input, Button, XStack } from "tamagui";
import { Keyboard } from "react-native";
import { useSearchStore } from "@/lib/word/useSearchStore";
import { useEffect } from "react";

export default function SearchInputWord() {
  const { search, setSearch, fetchResult, setFocus } = useSearchStore();

  useEffect(() => {
    if (search.length > 0) {
      fetchResult(search);
    }
  }, [search]);

  const handleSubmit = async () => {
    if (!search.trim()) return;
    await fetchResult(search);
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleFocus = () => {
    setFocus(true);
  };

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
        onChangeText={setSearch}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        onPress={handleFocus}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <Button
        bg="#f8f8f8"
        pressStyle={{ opacity: 0.8, bg: "#f8f8f8" }}
        onPress={handleSubmit}
      >
        <Search size={20} color="#000" />
      </Button>
    </XStack>
  );
}
