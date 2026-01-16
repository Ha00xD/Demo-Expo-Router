import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CalendarModal = ({ isVisible, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal isVisible={isVisible} hasBackdrop={false}>
      <View className={`flex-1 dark:bg-black/40 bg-black/80`}>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CalendarModal;
