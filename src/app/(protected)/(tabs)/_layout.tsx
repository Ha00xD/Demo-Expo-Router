import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { useColorScheme, View } from "react-native";
import { Colors } from "@/src/constants/theme";
import { useEffect, useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Walkthrough } from "../../(onboarding)/components/Walkthrough";

const GUIDE_STEPS = [
  {
    key: "house",
    imageSource: require("../../../assets/imgs/home.png"),
    text: "Go back home anytime",
  },
  {
    key: "message",
    imageSource: require("../../../assets/imgs/message.png"),
    text: "Go back home anytime",
  },
  {
    key: "scan",
    imageSource: require("../../../assets/imgs/scan.png"),
    text: "Quickly scan codes here",
  },
  {
    key: "noti",
    imageSource: require("../../../assets/imgs/noti.png"),
    text: "Go back home anytime",
  },
  {
    key: "menu",
    imageSource: require("../../../assets/imgs/menu.png"),
    text: "Access more settings",
  },
];

export default function TabLayout() {
  const { showGuide, setShowGuide } = useAuthStore();
  const colorScheme = useColorScheme();
  const homeRef = useRef<View>(null);
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState<any>(null);
  const scanRef = useRef<View>(null);
  const menuRef = useRef<View>(null);
  const messageRef = useRef<View>(null);
  const notiRef = useRef<View>(null);
  const refs = [homeRef, messageRef, scanRef, notiRef, menuRef];

  const openGuide = (index = 0) => {
    setTimeout(() => {
      const currentRef = refs[index];
      if (currentRef?.current) {
        currentRef.current.measureInWindow((x, y, width, height) => {
          setTarget({ x, y, width, height });
          setStep(index);
        });
      }
    }, 100);
  };

  const onNext = () => {
    if (step + 1 >= refs.length) {
      setTarget(null);
      setStep(0);
      setShowGuide(false);
      return;
    }
    openGuide(step + 1);
  };

  useEffect(() => {
    if (true) {
      openGuide(0);
    }
  }, [showGuide]);

  const onSkip = () => {
    setTarget(null);
    setStep(0);
    setShowGuide(false);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <View ref={homeRef} collapsable={false}>
                <Entypo name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="(message)"
          options={{
            title: "Message",
            tabBarIcon: ({ color }) => (
              <View ref={messageRef} collapsable={false}>
                <Feather name="message-square" size={24} color={color} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="(scanner)"
          options={{
            title: "Scan",
            tabBarIcon: ({ color }) => (
              <View
                ref={scanRef}
                style={{
                  backgroundColor: Colors[colorScheme ?? "dark"].background,
                }}
                className="w-[55px] h-[55px] rounded-full justify-center items-center absolute bottom-[5px] shadow-sm elevation-2"
              >
                <MaterialIcons name="qr-code-scanner" size={24} color={color} />
              </View>
            ),
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="(noti)"
          options={{
            title: "Notification",
            tabBarIcon: ({ color }) => (
              <View ref={notiRef}>
                <Ionicons name="notifications" size={24} color={color} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="(menu)"
          options={{
            title: "Menu",
            tabBarIcon: ({ color }) => (
              <View ref={menuRef}>
                <MaterialIcons name="menu" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="(map)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
      {target && (
        <Walkthrough
          visible={target}
          target={target}
          text={GUIDE_STEPS[step].text}
          step={step}
          total={GUIDE_STEPS.length}
          onNext={onNext}
          onSkip={onSkip}
          imageSource={GUIDE_STEPS[step].imageSource}
        />
      )}
    </>
  );
}
