import {
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Slot, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { useEffect } from "react";
import { tamaguiConfig } from "../tamagui.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    router.replace("/splash"); // splash screen dulu
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={DefaultTheme} theme="light">
        <Slot />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
