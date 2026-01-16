import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Header from "@/src/components/Header";

const Map = () => {
  const outlets = useLocalSearchParams();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) Alert.alert("Location permission denied");
      const currentLocation = await Location.getCurrentPositionAsync({});
      console.log("CL", currentLocation);
      setLocation(currentLocation);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Getting your location...</Text>
      </View>
    );
  }

  const latitude = outlets?.latitude ?? location?.coords.latitude;
  const longitude = outlets?.longitude ?? location?.coords.longitude;

  return (
    <View style={styles.container}>
      <Header title={outlets?.name ?? "Map View"} />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={outlets?.name ?? "My Location"}
          pinColor="purple"
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
