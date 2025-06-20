import { loginUser } from "@/services/authService";
import { BlurView } from "expo-blur";
import { Link, useRouter } from "expo-router";
import { Key, User } from "lucide-react-native";
import { useState } from "react";
import { ImageBackground, ToastAndroid } from "react-native";
import { Button, Input, Label, Text, View, XStack, YStack } from "tamagui";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleLogin = () => {
    const fetchLoginUser = async () => {
      try {
        await loginUser(email, password);
        ToastAndroid.show("Login success", ToastAndroid.SHORT);
        router.replace("/(tabs)/home");
      } catch (error) {
        ToastAndroid.show("Login failed", ToastAndroid.SHORT);
      }
    };
    fetchLoginUser();
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg/login.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View flex={1} justify="center" p="$6">
        <BlurView
          intensity={100}
          tint="dark"
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          {/* Header Title */}
          <YStack bg="rgba(255,255,255,0.3)" p={"$6"} rounded={"$4"}>
            <Text fontSize="$10" fontWeight="700" text="center" mb="$2">
              Welcome!
            </Text>
            <Text fontSize="$4" fontWeight="300" text="center" mb="$6">
              Don't have an account?{" "}
              <Link href="/register">
                <Text
                  color="$blue11"
                  fontWeight={"bold"}
                  textDecorationLine="underline"
                >
                  Sign up now!
                </Text>
              </Link>
            </Text>

            {/* Form Login */}
            <YStack gap="$4">
              {/* Email */}
              <YStack>
                <Label
                  htmlFor="email-login"
                  mb="$1"
                  fontSize="$4"
                  color={"$white1"}
                >
                  Email
                </Label>
                <XStack
                  items="center"
                  borderWidth={1}
                  borderColor="$white1"
                  bg="transparent"
                  rounded={"$4"}
                  px={"$3"}
                  height={50}
                >
                  <User size={20} color="#fff" />
                  <Input
                    id="email-login"
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    unstyled
                    flex={1}
                    px="$2"
                    bg="transparent"
                    color="$white1"
                    placeholderTextColor={"#fff"}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </XStack>
              </YStack>

              {/* Password */}
              <YStack>
                <Label
                  htmlFor="password-login"
                  mb="$1"
                  fontSize="$4"
                  color="$white1"
                >
                  Password
                </Label>
                <XStack
                  items="center"
                  borderWidth={1}
                  borderColor="$white1"
                  bg="transparent"
                  rounded={"$4"}
                  px={"$3"}
                  height={50}
                >
                  <Key size={20} color="#fff" />
                  <Input
                    id="password-login"
                    placeholder="••••••••"
                    keyboardType="default"
                    secureTextEntry
                    bg="transparent"
                    color="$white1"
                    unstyled
                    placeholderTextColor={"#fff"}
                    value={password}
                    width={"100%"}
                    onChangeText={(text) => setPassword(text)}
                  />
                </XStack>
              </YStack>

              {/* Button */}
              <Button
                mt="$4"
                bg="#4169e1"
                color="white"
                pressStyle={{
                  bg: "#4169e1",
                  scale: 0.97,
                  shadowColor: "$red10",
                  shadowRadius: 10,
                }}
                fontWeight={"bold"}
                onPress={handleLogin}
              >
                Sign In
              </Button>
            </YStack>
            <Text text={"center"} mt={"$4"} fontWeight={"bold"}>
              Login as Admin?{" "}
              <Link href={"/admin/login"}>
                <Text
                  fontWeight={"bold"}
                  color={"$blue11"}
                  textDecorationLine="underline"
                >
                  Sign In!
                </Text>
              </Link>
            </Text>
          </YStack>
        </BlurView>
      </View>
    </ImageBackground>
  );
}
