import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";

const GUIDE_STEPS = [
  { key: "start", text: "This is the Start button" },
  { key: "profile", text: "Access your profile here" },
  { key: "settings", text: "Change app settings here" },
  {
    key: "menu",
    text: "Testing step 4 with longer text to show height adjustment",
  },
  {
    key: "card",
    text: "Testing step 4 with longer text to show height adjustment Testing step 4 with longer text to show height adjus",
  },
];

export default function HomeScreen() {
  const startRef = useRef<View>(null);
  const profileRef = useRef<View>(null);
  const settingsRef = useRef<View>(null);
  const menuRef = useRef<View>(null);
  const cardRef = useRef<View>(null);
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState<any>(null);
  const refs = [startRef, profileRef, settingsRef, menuRef, cardRef];

  const openGuide = (index = 0) => {
    refs[index].current?.measureInWindow((x, y, width, height) => {
      setTarget({ x, y, width, height });
      setStep(index);
    });
  };

  const next = () => {
    if (step + 1 >= refs.length) return closeGuide();
    openGuide(step + 1);
  };

  const closeGuide = () => {
    setTarget(null);
    setStep(0);
  };

  useEffect(() => {
    openGuide();
  }, []);

  const GuideOverlay = ({
    visible,
    target,
    text,
    step,
    total,
    onNext,
    onSkip,
  }) => {
    const { x, y, width, height } = target;
    const screenHeight = Dimensions.get("window").height;
    const isLast = step === total - 1;

    const isAbove = y > screenHeight / 2;
    const verticalPosition = isAbove
      ? { bottom: screenHeight - y + 10 }
      : { top: y + height + 10 };

    return (
      <Modal isVisible={visible} backdropOpacity={0.4} style={{ margin: 0 }}>
        <View className="flex-1">
          <View
            style={{ top: y, left: x, width, height }}
            className="absolute rounded-md border-2 border-red-00"
          />

          <View
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              ...verticalPosition,
            }}
            className="bg-white p-5 rounded-xl shadow-lg"
          >
            <Text className="text-slate-800 text-lg font-medium">{text}</Text>

            <View className="flex-row justify-between mt-5">
              <TouchableOpacity onPress={onSkip} className="px-4 py-2">
                <Text className="text-slate-400 font-bold">Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onNext}
                className="bg-stone-400 px-6 py-2 rounded-lg"
              >
                <Text className="text-white font-bold">
                  {isLast ? "Done" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <TouchableOpacity onPress={() => openGuide()} style={{ marginTop: 60 }}>
        <Text style={{ fontWeight: "600" }}>Show Guide</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          ref={startRef}
          className="w-[100px] h-[100px] bg-blue-400 rounded-sm justify-center items-center"
        >
          <Text style={{ color: "white" }}>Test</Text>
        </View>

        <View
          ref={cardRef}
          className="w-[50px] h-[50px] bg-red-400 rounded-sm justify-center items-center"
        >
          <Text>Test</Text>
        </View>

        <View className="flex-row justify-between mb-5">
          <TouchableOpacity ref={profileRef}>
            <Text style={{ fontSize: 18 }}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity ref={menuRef}>
            <Text style={{ fontSize: 18 }}>Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity ref={settingsRef}>
            <Text style={{ fontSize: 18 }}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {target && (
        <GuideOverlay
          visible={target}
          target={target}
          step={step}
          total={GUIDE_STEPS.length}
          text={GUIDE_STEPS[step].text}
          onNext={next}
          onSkip={closeGuide}
        />
      )}
    </View>
  );
}
