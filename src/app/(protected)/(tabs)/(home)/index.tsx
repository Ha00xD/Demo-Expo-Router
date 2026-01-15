import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useGetOutlets } from "@/src/hooks/useGetOutlets";
import { outletsData } from "@/src/mock/OutletData";
import { useStore } from "@/src/store/useStore";
import { useTheme } from "@/src/hooks/useTheme";

const HomeScreen = () => {
  const db = useSQLiteContext();
  const { outlets, refreshOutlets } = useGetOutlets();
  const { setToken } = useStore();
  const { colors } = useTheme();

  const insertOutlets = async () => {
    try {
      for (const outlet of outletsData) {
        await db.runAsync(
          `INSERT INTO outletStore 
           (name, street, city, date, status, latitude, longitude)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            outlet.name,
            outlet.street,
            outlet.city,
            outlet.date,
            outlet.status,
            outlet.latitude,
            outlet.longitude,
          ]
        );
      }
      await refreshOutlets();
      Alert.alert("Success", "Outlets inserted successfully");
    } catch (error) {
      console.log("Error At InsertOutlets", error);
    }
  };

  const deleteOutlets = async () => {
    try {
      await db.runAsync(`DELETE FROM outletStore`);
      await refreshOutlets();
      Alert.alert("Deleted", "Outlets data deleted");
    } catch (error) {
      console.log("Failed to delete outlets.");
    }
  };

  const getOutlets = async () => {
    const ol = await db.getAllAsync("SELECT * FROM outletStore");
    console.log("OL", ol);
  };

  useEffect(() => {
    getOutlets();
  });

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(tabs)/(home)/[id]",
            params: { id: item.id },
          })
        }
        className={`rounded-xl p-4 mb-3  `}
        style={{ backgroundColor: colors.card }}
      >
        <View className="flex-row justify-between items-center">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold"
          >
            {item.name}
          </Text>
          <Text
            style={{ color: colors.text }}
            className={`text-xs px-2 py-1 rounded-full`}
            style={{
              color: item.status == "pending" ? colors.red : colors.green,
            }}
          >
            {item.status}
          </Text>
        </View>

        <Text style={{ color: colors.text }} className="mt-1">
          {item.street}, {item.city}
        </Text>

        <Text style={{ color: colors.text }} className="text-xs mt-1">
          Date: {item.date}
        </Text>

        <View className="flex-row justify-between mt-3">
          <Text style={{ color: colors.text }} className="text-xs ">
            Lat: {item.latitude}
          </Text>
          <Text style={{ color: colors.text }} className="text-xs ">
            Lng: {item.longitude}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setToken(null);
          router.replace("/(auth)" as any);
        },
      },
    ]);
  };
  return (
    <View
      className={`flex-1 px-3`}
      style={{ backgroundColor: colors.background }}
    >
      <View className="flex-row items-center my-3 p-3 justify-between ">
        <Text
          className="text-2xl font-bold text-gray-800 "
          style={{ color: colors.text }}
        >
          Outlets
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="px-4 py-2 rounded-lg w-24 items-center"
          style={{ backgroundColor: colors.red }}
        >
          <Text className="text-sm font-medium text-stone-100">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-4 space-x-3 gap-5">
        <TouchableOpacity
          className="flex-1 py-3 rounded-lg justify-center"
          onPress={insertOutlets}
          style={{ backgroundColor: colors.green }}
        >
          <Text className="text-white text-sm text-center font-semibold">
            Insert Outlets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 py-3 rounded-lg justify-center"
          onPress={deleteOutlets}
          style={{ backgroundColor: colors.red }}
        >
          <Text className="text-white text-center font-semibold">
            Delete All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 py-3 rounded-lg justify-center"
          onPress={() =>
            router.push({ pathname: "/(protected)/(tabs)/(map)/map" })
          }
          style={{ backgroundColor: colors.red }}
        >
          <Text className="text-white text-center font-semibold">Map</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        data={outlets}
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-gray-400">No outlets found</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
