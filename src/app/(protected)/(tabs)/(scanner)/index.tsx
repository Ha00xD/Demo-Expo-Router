import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import LottieView from "lottie-react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "@/src/components/HeaderBack";

const ScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission denied",
        "Please allow media library access from settings."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Scan QR Code" />

      <View style={{ flex: 1 }}>
        <CameraView
          style={StyleSheet.absoluteFill}
          enableTorch={torchOn}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />

        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanBox}>
              <LottieView
                autoPlay
                loop
                style={{ width: 220, height: 220 }}
                source={require("../../../../assets/json/Scanner.json")}
                colorFilters={[
                  { keypath: "**.Fill 1", color: "white" },
                  { keypath: "**.Stroke 1", color: "white" },
                ]}
              />
            </View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom} />
        </View>
      </View>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  overlayMiddle: {
    flexDirection: "row",
    height: 220,
  },

  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  scanBox: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },

  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  actionContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    alignSelf: "flex-end",
    bottom: "10%",
  },

  demoButton: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  demoText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
});
