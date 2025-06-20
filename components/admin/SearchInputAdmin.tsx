import { useSearchAdminStore } from "@/lib/admin/useSearchStore";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Button, Input, XStack } from "tamagui";
import { debounce } from "lodash";

export default function SearchInputAdmin() {
  const { searchByKeyword, setSearch } = useSearchAdminStore();
  const [localSearch, setLocalSearch] = useState("");

  const debouncedSearch = debounce((val: string) => {
    setSearch(val);
    if (val.trim().length > 0) {
      searchByKeyword(val);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(localSearch);
    return () => debouncedSearch.cancel();
  }, [localSearch]);

  return (
    <XStack items="center" space="$2">
      <Input
        flex={1}
        size="$4"
        placeholder="Search Terms..."
        color="#fff"
        bg="#232832"
        placeholderTextColor="#888"
        borderColor="#232832"
        value={localSearch}
        onChangeText={setLocalSearch}
      />
      <Button bg="#232832">
        <Search size={20} color="#fff" />
      </Button>
    </XStack>
  );
}
