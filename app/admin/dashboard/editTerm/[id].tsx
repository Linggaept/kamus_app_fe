import { useTermAdminStore } from "@/lib/admin/useTermAdminStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { Input, Label, Text, TextArea, View, YStack, Button } from "tamagui";

export default function EditTerm() {
  const [termText, setTermText] = useState("");
  const [definitionText, setDefinitionText] = useState("");
  const { selectedTerm, editTermById } = useTermAdminStore();

  useEffect(() => {
    if (selectedTerm) {
      setTermText(selectedTerm.term);
      setDefinitionText(selectedTerm.definition);
    }
  }, [selectedTerm]);

  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      router.replace("/admin/dashboard/dashboard");
      return true; // block default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleEditTerm = async () => {
    if (!termText || !definitionText) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await editTermById(selectedTerm!.term_id, termText, definitionText);
      router.replace("/admin/dashboard/dashboard");
    } catch (error) {
      console.error("Failed to edit term:", error);
    }
  };

  return (
    <View flex={1} bg="#191e2d" p="$4">
      {/* Header */}
      <Text fontSize="$8" fontWeight="bold" color="$white1" mb="$4">
        Edit Terms
      </Text>

      {/* Form */}
      <YStack space="$4">
        {/* Terms */}
        <YStack>
          <Label htmlFor="term" color="$white1" mb="$1">
            Term
          </Label>
          <Input
            id="term-Edit"
            placeholder="Enter term..."
            bg="#232832"
            color="$white1"
            px="$3"
            py="$2"
            value={termText}
            onChangeText={setTermText}
          />
        </YStack>

        {/* Description */}
        <YStack>
          <Label htmlFor="description" color="$white1" mb="$1">
            Description
          </Label>
          <TextArea
            id="description-Edit"
            placeholder="Enter description..."
            bg="#232832"
            color="$white1"
            px="$3"
            py="$2"
            numberOfLines={5}
            value={definitionText}
            onChangeText={setDefinitionText}
          />
        </YStack>

        {/* Submit Button */}
        <Button
          mt="$4"
          bg="#4169e1"
          color="$white1"
          pressStyle={{ bg: "#4169e1" }}
          onPress={() => {
            handleEditTerm();
          }}
        >
          Save Changes
        </Button>
      </YStack>
    </View>
  );
}
