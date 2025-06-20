import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      <Image
        source={require("../assets/images/splash/splash.png")}
        resizeMode="contain"
        style={{ width: 430, height: 430 }}
      />
    </View>
  );
}
