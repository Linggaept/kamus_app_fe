import { ButtonAddTerm } from "@/components/admin/ButtonAddTerm";
import { ListTerm } from "@/components/admin/ListTerm";
import SearchInputAdmin from "@/components/admin/SearchInputAdmin";
import { useTermAdminStore } from "@/lib/admin/useTermAdminStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, ScrollView, Text, XStack, YStack } from "tamagui";

export default function Dashboard() {
  const { page, totalPages, setPage, getAllTermsAdmin, terms } =
    useTermAdminStore();

  const router = useRouter();
  const logoutAdmin = () => {
    router.replace("/admin/login");
  };

  useEffect(() => {
    getAllTermsAdmin(page);
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
    <ScrollView flex={1} bg={"#191e2d"}>
      <XStack bg={"$black1"} items={"center"} justify={"space-between"}>
        <Text fontSize="$8" fontWeight="bold" color="$white1" p={"$4"}>
          Admin Panel
        </Text>

        <Button onPress={logoutAdmin} bg={"red"} color={"#fff"} mr={"$4"}>
          <Text fontWeight={"bold"}>Logout</Text>
        </Button>
      </XStack>
      <YStack space="$4" p={"$4"}>
        {/* Header */}
        <YStack gap={"$4"}>
          <SearchInputAdmin />
          <ButtonAddTerm />
        </YStack>

        {/* List */}
        <ListTerm />

        <XStack justify="center" items="center" space="$3" p="$4">
          <Button onPress={handlePrev} disabled={page === 1}>
            Prev
          </Button>
          <Text>
            {page} / {totalPages}
          </Text>
          <Button onPress={handleNext} disabled={page === totalPages}>
            Next
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
  );
}
