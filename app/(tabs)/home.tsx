import SearchInputWord from "@/components/SearchInputWord";
import SearchResultWord from "@/components/SearchResultWord";
import { View } from "tamagui";

export default function Home() {


  return (
    <View bg={"$white1"} flex={1} width={"100%"}>
      <SearchInputWord />
      <SearchResultWord />
    </View>
  );
}
