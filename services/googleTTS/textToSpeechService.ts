import axios from "axios";
import * as FileSystem from "expo-file-system";

const GOOGLE_API_KEY = "AIzaSyA2Cs8cjr5QbgzxGqM_qsNmGDjp2kMLHXE"; // ganti dengan API key kamu

export const getSpeechAudio = async (text: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${GOOGLE_API_KEY}`,
      {
        input: { text },
        voice: {
          languageCode: "id-ID",
          name: "id-ID-Standard-A",
        },
        audioConfig: {
          audioEncoding: "LINEAR16",
          pitch: 0,
          speakingRate: 1,
          effectsProfileId: ["small-bluetooth-speaker-class-device"],
        },
      }
    );

    const audioContent = response.data.audioContent;
    if (audioContent) {
      const path = FileSystem.cacheDirectory + "tts_output.wav";
      await FileSystem.writeAsStringAsync(path, audioContent, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return path;
    } else {
      return null;
    }
  } catch (error) {
    console.error("TTS fetch error:", error);
    return null;
  }
};
