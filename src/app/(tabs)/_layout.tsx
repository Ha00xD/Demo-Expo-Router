import { Tabs } from "expo-router";
import { View, useColorScheme } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/src/constants/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: Colors[colorScheme ?? "dark"].background,
              }}
              className="w-[55px] h-[55px] rounded-full justify-center items-center absolute bottom-[5px] shadow-sm elevation-2"
            >
              <AntDesign name="scan" size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <AntDesign name="menu" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
