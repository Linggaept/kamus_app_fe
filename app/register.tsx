import { regiterUser } from "@/services/authService";
import { BlurView } from "expo-blur";
import { Link, useRouter } from "expo-router";
import { Key, User } from "lucide-react-native";
import { useState } from "react";
import { ImageBackground, ToastAndroid } from "react-native";
import { Button, Input, Text, View, YStack, Label, XStack } from "tamagui";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    const fetchRegisterUser = async () => {
      try {
        await regiterUser(username, email, password);
        ToastAndroid.show("Register success", ToastAndroid.SHORT);
        router.replace("/");
      } catch (error) {
        ToastAndroid.show("Register failed", ToastAndroid.SHORT);
      }
    };
    fetchRegisterUser();
  };
  return (
    <ImageBackground
      source={require("../assets/images/bg/register.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View flex={1} bg="transparent" justify="center" p="$6">
        {/* Header Title */}
        <BlurView
          intensity={100}
          tint="dark"
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          <YStack bg="rgba(255,255,255,0.3)" p={"$6"} rounded={"$4"}>
            <Text fontSize="$10" fontWeight="700" text="center" mb="$2">
              Get Started!
            </Text>
            <Text fontSize="$4" fontWeight="300" text="center" mb="$6">
              Have an account?{" "}
              <Link href="/">
                <Text color="$blue11" textDecorationLine="underline">
                  Sign In!
                </Text>
              </Link>
            </Text>

            {/* Form Login */}
            <YStack gap="$4">
              {/* Email */}
              <YStack>
                <Label
                  htmlFor="email-register"
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
                    id="email-register"
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
              {/* Name */}
              <YStack>
                <Label
                  htmlFor="name-register"
                  mb="$1"
                  fontSize="$4"
                  color={"$white1"}
                >
                  Your Name
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
                    id="name-register"
                    placeholder="your name"
                    keyboardType="default"
                    autoCapitalize="none"
                    unstyled
                    flex={1}
                    px="$2"
                    bg="transparent"
                    color="$white1"
                    placeholderTextColor={"#fff"}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </XStack>
              </YStack>

              {/* Password */}
              <YStack>
                <Label
                  htmlFor="password-register"
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
                    id="password-register"
                    placeholder="••••••••"
                    secureTextEntry
                    bg="transparent"
                    color="$white1"
                    unstyled
                    placeholderTextColor={"#fff"}
                    value={password}
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
                  scaleX: 0.97,
                  scale: 0.97,
                  shadowColor: "$red10",
                  shadowRadius: 10,
                }}
                fontWeight={"bold"}
                onPress={handleRegister}
              >
                Sign Up
              </Button>
            </YStack>
          </YStack>
        </BlurView>
      </View>
    </ImageBackground>
  );
}
