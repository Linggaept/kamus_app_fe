import { useRouter } from "expo-router";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { AnimatePresence, Text, View, XStack, YStack } from "tamagui";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleLogout =  () => {
    try {
      router.replace("/");
    } catch (error) {
      ToastAndroid.show("Logout failed", ToastAndroid.SHORT);
      throw error;
    }
  };
  return (
    <View flex={1} bg="$white1" p="$4">
      <YStack space="$4">
        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout}>
          <XStack
            items="center"
            justify="space-between"
            p="$4"
            height={70}
            borderBottomWidth={1}
            borderBottomColor="$black1"
            bg="$white1"
          >
            <Text fontSize="$6" color="$red10" fontWeight="bold">
              Logout
            </Text>
            <ArrowRight size={24} color="#E5484D" />
          </XStack>
        </TouchableOpacity>

        {/* Accordion - Tentang Kami */}
        <YStack>
          <XStack
            justify="space-between"
            items="center"
            p="$4"
            onPress={() => setOpen(!open)}
            borderBottomWidth={1}
            borderBottomColor="$black1"
          >
            <Text fontSize="$5" fontWeight="bold" color="$black1">
              Tentang Kami
            </Text>
            {open ? (
              <ChevronUp size={22} color="#000" />
            ) : (
              <ChevronDown size={22} color="#000" />
            )}
          </XStack>

          <AnimatePresence>
            {open && (
              <YStack
                key="accordion"
                animation="medium"
                enterStyle={{ opacity: 0, y: -10 }}
                exitStyle={{ opacity: 0, y: -10 }}
                p="$4"
                bg="$white1"
                mt="$2"
              >
                <Text fontSize="$4" color="$black1" text={"justify"}>
                  <Text fontSize="$4" fontWeight="bold" color={"$black1"}>
                    TechVocab
                  </Text>{" "}
                  adalah aplikasi kamus digital yang fokus pada istilah-istilah
                  yang digunakan dalam dunia komputer dan teknologi informasi.
                  Aplikasi ini bertujuan untuk membantu pengguna, baik pelajar,
                  mahasiswa, maupun masyarakat umum, dalam memahami istilah
                  teknis yang sering muncul dalam pembelajaran, pekerjaan, atau
                  literatur digital. Setiap entri dalam TechVocab dilengkapi
                  dengan definisi yang ringkas dan mudah dipahami. Pengguna
                  dapat melakukan pencarian istilah tertentu dan melihat riwayat
                  pencarian mereka. Dengan pendekatan ini, TechVocab diharapkan
                  dapat menjadi alat bantu belajar yang efektif bagi siapa pun
                  yang ingin memperluas pemahaman mereka tentang terminologi
                  komputer secara praktis dan efisien.
                </Text>
              </YStack>
            )}
          </AnimatePresence>
        </YStack>

      </YStack>
    </View>
  );
}
