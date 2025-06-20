import { addTerms } from "@/services/admin/termAdminService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { Input, Label, Text, TextArea, View, YStack, Button } from "tamagui";

export default function AddTerms() {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const router = useRouter();

  const handleAddTerm = async () => {
    if (!term || !definition) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }
    
    try {
      await addTerms(term, definition);
      ToastAndroid.show("Term added successfully", ToastAndroid.SHORT);
      router.replace("/admin/dashboard/dashboard");
    } catch (error) {
      ToastAndroid.show("Failed to add term", ToastAndroid.SHORT);
    }
  };

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
  return (
    <View flex={1} bg="#191e2d" p="$4">
      {/* Header */}
      <Text fontSize="$8" fontWeight="bold" color="$white1" mb="$4">
        Add New Term
      </Text>

      {/* Form */}
      <YStack space="$4">
        {/* Terms */}
        <YStack>
          <Label htmlFor="term" color="$white1" mb="$1">
            Term
          </Label>
          <Input
            id="term"
            placeholder="Enter term..."
            bg="#232832"
            color="$white1"
            px="$3"
            py="$2"
            value={term}
            onChangeText={(text) => setTerm(text)}
          />
        </YStack>

        {/* Description */}
        <YStack>
          <Label htmlFor="description" color="$white1" mb="$1">
            Description
          </Label>
          <TextArea
            id="description"
            placeholder="Enter description..."
            bg="#232832"
            color="$white1"
            px="$3"
            py="$2"
            numberOfLines={5}
            multiline
            value={definition}
            onChangeText={(text) => setDefinition(text)}
          />
        </YStack>

        {/* Submit Button */}
        <Button
          mt="$4"
          bg="#4169e1"
          color="$white1"
          pressStyle={{ bg: "#4169e1" }}
          onPress={() => {
            // Logika simpan bisa di sini
            handleAddTerm();
            ToastAndroid.show("Term added successfully!", ToastAndroid.SHORT);
          }}
        >
          Add Term
        </Button>
      </YStack>
    </View>
  );
}
