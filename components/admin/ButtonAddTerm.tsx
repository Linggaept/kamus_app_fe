import { useRouter } from "expo-router";
import { Button, Text } from "tamagui";

export const ButtonAddTerm = () => {
  const router = useRouter();
  const handleAddNewTerm = () => {
    router.replace("/admin/dashboard/add");
  };
  return (
    <Button
      bg={"#4169e1"}
      pressStyle={{ bg: "#4169e1" }}
      onPress={handleAddNewTerm}
    >
      <Text fontWeight={"bold"} color={"#fff"}>
        + Add New Term
      </Text>
    </Button>
  );
};
