import { useTermStore } from "@/lib/useTermStore";
import { getSpeechAudio } from "@/services/googleTTS/textToSpeechService";
import { Audio } from "expo-av";
import { ChevronDown, Loader, Volume2 } from "lucide-react-native";
import { memo, useCallback, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from "react-native";
import { Text, View, XStack } from "tamagui";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface AccordionItemProps {
  term_id: number;
  title: string;
  content: string;
}

function AccordionItemComponent({ term_id, title, content }: AccordionItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { addToHistory } = useTermStore();

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
    addToHistory(term_id);
  }, [term_id, addToHistory]);

  const speakContent = useCallback(async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const path = await getSpeechAudio(title);
      if (path) {
        const { sound } = await Audio.Sound.createAsync({ uri: path });
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if ("isPlaying" in status && !status.isPlaying) {
            sound.unloadAsync();
            setIsSpeaking(false);
          }
        });
      } else {
        console.warn("Failed to get TTS audio");
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(false);
    }
  }, [title, isSpeaking]);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand}>
        <Text style={styles.title}>{title}</Text>
        <ChevronDown
          size={18}
          color="#333"
          style={{
            transform: [{ rotate: expanded ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.contentContainer}>
          <XStack justify="space-between" items="center">
            <Text style={styles.content}>{content}</Text>
            <TouchableOpacity onPress={speakContent} disabled={isSpeaking}>
              {isSpeaking ? (
                <Loader size={20} color="#999" />
              ) : (
                <Volume2 size={20} color="#000" />
              )}
            </TouchableOpacity>
          </XStack>
        </View>
      )}
    </View>
  );
}

export default memo(AccordionItemComponent);

const styles = StyleSheet.create({
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contentContainer: {
    marginTop: 8,
  },
  content: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
});
