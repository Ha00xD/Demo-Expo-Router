import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/src/store/useStore";
import { useTheme } from "@/src/hooks/useTheme";

const { width } = Dimensions.get("window");

const OnBoardingData = [
  {
    id: "1",
    title: "Welcome",
    desc: "Discover new features in 2026.",
  },
  {
    id: "2",
    title: "Connect",
  },
  {
    id: "3",
    title: "Launch",
  },
];

const OnBoardingScreen = () => {
  const router = useRouter();
  const { setIsFirstTime } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  console.log("Check currentIndex>>>>", currentIndex);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    console.log("CHECK VIEW ABLE ITEMS", viewableItems);
    console.log("CHECK VIEW ABLE ITEMS INDEX", viewableItems[0].index);
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleFinish = () => {
    setIsFirstTime(false);
    router.replace("/(auth)");
  };

  const nextSlide = () => {
    if (currentIndex < OnBoardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  };

  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-black">
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        data={OnBoardingData}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width }}
              className="flex-1 justify-center items-center"
            >
              <Text className="text-slate-100 text-2xl font-bold">
                {item.title}
              </Text>
            </View>
          );
        }}
      />
      <View className="absolute bottom-10 px-5 left-0 right-0">
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3">
            {OnBoardingData.map((item, index) =>
              index == currentIndex ? (
                <View
                  key={item.id}
                  className="w-[10px] h-[10px] rounded-full bg-emerald-400"
                />
              ) : (
                <View
                  key={item.id}
                  className="w-[10px] rounded-full h-[10px] bg-white"
                />
              )
            )}
          </View>
          <View className="flex-row gap-5">
            <TouchableOpacity
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: colors.text }}
              onPress={handleFinish}
            >
              <Text className="text-sm" style={{ color: colors.primary }}>
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 rounded-md w-[100px]"
              style={{ backgroundColor: colors.text }}
              onPress={nextSlide}
            >
              <Text
                className="text-sm"
                style={{ color: colors.primary, alignSelf: "center" }}
              >
                {currentIndex == 2 ? "Get Started" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
