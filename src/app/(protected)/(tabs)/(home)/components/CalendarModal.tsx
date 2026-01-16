import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const CalendarModal = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible}>
      <Text>CalendarModal</Text>
    </Modal>
  );
};

export default CalendarModal;
