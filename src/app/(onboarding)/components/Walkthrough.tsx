import { Colors } from "@/src/constants/theme";
import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";
import { useColorScheme } from "nativewind";
interface Target {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GuideProps {
  visible: boolean;
  target: Target;
  text: string;
  step: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
  imageSource: any;
}

const ARROW_SIZE = 7;
const PADDING = 10;
const TOOLTIP_OFFSET = 15;
const ARROW_LIMIT = 40;

export const Walkthrough = ({
  visible,
  target,
  text,
  step,
  total,
  onNext,
  onSkip,
  imageSource,
}: GuideProps) => {
  const { x, y, width, height } = target;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const isAbove = y > screenHeight / 2;
  const tooltipPosition = isAbove
    ? { bottom: screenHeight - y + ARROW_SIZE + TOOLTIP_OFFSET }
    : { top: y + height + ARROW_SIZE + TOOLTIP_OFFSET };
  const arrowCenterX = Math.max(
    ARROW_LIMIT,
    Math.min(x + width / 2, screenWidth - ARROW_LIMIT)
  );
  const arrowLeft = arrowCenterX - 22;
  const { colorScheme, setColorScheme } = useColorScheme();
  const size = Math.max(width, height) + PADDING * 1.5;
  const radius = size / 2;
  const centeredTop = y - (size - height) / 2;
  const centeredLeft = x - (size - width) / 2;

  return (
    <Modal isVisible={visible} hasBackdrop={false} style={{ margin: 0 }}>
      <View className={`flex-1 dark:bg-black/40 bg-black/80`}>
        <View
          style={{
            position: "absolute",
            top: centeredTop,
            left: centeredLeft,
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={imageSource}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        {/* tool tips sec */}
        <View
          className="absolute left-5 right-5 bg-white p-5 rounded-xl shadow-md"
          style={tooltipPosition}
        >
          <View
            className="absolute w-0 h-0"
            style={[
              {
                left: arrowLeft,
                [isAbove ? "bottom" : "top"]: -ARROW_SIZE,
                borderLeftWidth: ARROW_SIZE,
                borderRightWidth: ARROW_SIZE,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
              },
              isAbove
                ? {
                    borderTopWidth: ARROW_SIZE,
                    borderTopColor: "white",
                  }
                : {
                    borderBottomWidth: ARROW_SIZE,
                    borderBottomColor: "white",
                  },
            ]}
          />

          <Text className="text-lg font-bold text-slate-900 mb-1">
            Step {step + 1} of {total}
          </Text>

          <Text className="text-base text-slate-600 mb-6">{text}</Text>

          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              //onPress={onSkip}
              onPress={() =>
                setColorScheme(colorScheme === "light" ? "dark" : "light")
              }
            >
              <Text className="font-bold text-slate-800">Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onNext}
              className="bg-emerald-900 px-8 py-3 rounded-full"
            >
              <Text className="font-bold text-white">
                {step === total - 1 ? "Got it!" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
