import { useEffect, useState } from "react";
import { Button, Text, View, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useTermAdminStore } from "@/lib/admin/useTermAdminStore";
import { useSearchAdminStore } from "@/lib/admin/useSearchStore";

export const ListTerm = () => {
  const [showModal, setShowModal] = useState(false);
  const [termIdToDelete, setTermIdToDelete] = useState<number | null>(null);
  const router = useRouter();

  const { terms, getByIdTerm, deleteTermById, getAllTermsAdmin } =
    useTermAdminStore();

  const { result, search } = useSearchAdminStore();

  const handleEditButton = (id: number) => {
    getByIdTerm(id);
    router.replace({
      pathname: "/admin/dashboard/editTerm/[id]",
      params: { id: String(id) },
    });
  };

  const handleDelete = async () => {
    if (termIdToDelete !== null) {
      await deleteTermById(termIdToDelete);
      await getAllTermsAdmin();
      setTermIdToDelete(null);
      setShowModal(false);
    }
  };

  const getByIdTermDelete = async (id: number) => {
    await getByIdTerm(id);
    setTermIdToDelete(id);
    setShowModal(true);
  };

  // Gunakan result jika ada hasil pencarian, fallback ke terms
  const dataToRender = search.length > 0 && result.length > 0 ? result : terms;

  return (
    <YStack bg={"#232832"} p={"$4"} gap={"$4"}>
      {dataToRender.map((item : any, index : number) => (
        <XStack gap={"$2"} key={index}>
          <YStack>
            <Text>{item.term}</Text>
            <Text width={200}>
              {item.definition.length > 100
                ? item.definition.substring(0, 100) + "..."
                : item.definition}
            </Text>
          </YStack>

          <Button
            bg={"#4169e1"}
            pressStyle={{ bg: "#4169e1" }}
            onPress={() => handleEditButton(item.term_id)}
          >
            Edit
          </Button>

          <Button
            bg={"$red11"}
            pressStyle={{ bg: "$red11" }}
            onPress={() => getByIdTermDelete(item.term_id)}
          >
            Delete
          </Button>
        </XStack>
      ))}

      {/* Modal Konfirmasi */}
      {showModal && (
        <View
          position="absolute"
          t={0}
          l={0}
          r={0}
          b={0}
          bg="rgba(0, 0, 0, 0.5)"
          justify="center"
          items="center"
          z={100}
        >
          <View bg="#232832" p="$4" width={300} rounded={10} gap="$3">
            <Text color="#fff" fontSize="$6" fontWeight="bold">
              Confirm Delete
            </Text>
            <Text color="#fff">Are you sure you want to delete this term?</Text>
            <XStack justify="flex-end" gap="$2" mt="$2">
              <Button bg="$black7" onPress={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button bg="$red10" onPress={handleDelete}>
                Yes, Delete
              </Button>
            </XStack>
          </View>
        </View>
      )}
    </YStack>
  );
};