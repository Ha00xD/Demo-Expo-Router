import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";

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

export const GuideOverlay = ({
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
  const arrowSize = 7;
  const verticalPosition = isAbove
    ? { bottom: screenHeight - y + arrowSize + 15 }
    : { top: y + height + arrowSize + 15 };
  const arrowX = Math.max(40, Math.min(x + width / 2, screenWidth - 40));
  const arrowPosition = arrowX - 20;
  const padding = 10;
  const radius = Math.max(width, height) / 2 + padding;

  return (
    <Modal isVisible={visible} hasBackdrop={false} style={{ margin: 0 }}>
      <View className="flex-1 bg-black/70">
        <View
          className="absolute"
          style={{
            top: y - padding,
            left: x - padding,
            width: width + padding * 2,
            height: height + padding * 2,
          }}
        >
          <View
            className="flex-1 border border-white bg-white items-center justify-center"
            style={{ borderRadius: radius }}
          >
            <Image source={imageSource} className="w-6 h-6" />
          </View>
        </View>

        <View
          className="absolute left-5 right-5 bg-white p-5 rounded-xl shadow-md"
          style={verticalPosition}
        >
          <View
            className="absolute w-0 h-0"
            style={[
              {
                left: arrowPosition,
                [isAbove ? "bottom" : "top"]: -arrowSize,
                borderLeftWidth: arrowSize,
                borderRightWidth: arrowSize,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
              },
              isAbove
                ? {
                    borderTopWidth: arrowSize,
                    borderTopColor: "white",
                  }
                : {
                    borderBottomWidth: arrowSize,
                    borderBottomColor: "white",
                  },
            ]}
          />

          <Text className="text-slate-900 text-lg font-bold mb-1">
            Step {step + 1}
          </Text>
          <Text className="text-slate-600 text-base mb-6">{text}</Text>

          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={onSkip}>
              <Text className="text-slate-800 font-bold">Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNext}
              className="bg-emerald-900 px-8 py-3 rounded-full"
            >
              <Text className="text-white font-bold">
                {step === total - 1 ? "Got it!" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
