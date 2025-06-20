import { Tabs } from "expo-router";
import { Book, Home, Settings } from "lucide-react-native";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: theme.blue11.val, // warna teks/icon saat aktif
        tabBarInactiveTintColor: theme.white1.val, // warna teks/icon saat tidak aktif
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 12,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          height: 80,
          backgroundColor: theme.black1.val,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Search",
          headerStyle: { backgroundColor: theme.black1.val },
          headerTitleStyle: { color: theme.white1.val },
          headerTintColor: theme.white1.val,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: "Meanings",
          headerStyle: { backgroundColor: theme.black1.val },
          headerTitleStyle: { color: theme.white1.val },
          headerTintColor: theme.white1.val,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Book color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerStyle: { backgroundColor: theme.black1.val },
          headerTitleStyle: { color: theme.white1.val },
          headerTintColor: theme.white1.val,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
