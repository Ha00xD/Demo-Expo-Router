import { useGetOutlets } from "@/src/hooks/useGetOutlets";
import { outletsData } from "@/src/mock/OutletData";
import { useAuthStore } from "@/src/store/useAuthStore";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const db = useSQLiteContext();
  const { outlets, refreshOutlets } = useGetOutlets();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuthStore();

  const insertOutlets = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
        className="bg-white rounded-xl p-4 mb-3 border border-gray-200 "
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text
            className={`text-xs px-2 py-1 rounded-full ${
              item.status === "done"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.status}
          </Text>
        </View>

        <Text className="text-gray-600 mt-1">
          {item.street}, {item.city}
        </Text>

        <Text className="text-gray-400 text-xs mt-1">Date: {item.date}</Text>

        <View className="flex-row justify-between mt-3">
          <Text className="text-xs text-gray-500">Lat: {item.latitude}</Text>
          <Text className="text-xs text-gray-500">Lng: {item.longitude}</Text>
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
    <View className="flex-1 bg-gray-100 px-3">
      <View className="flex-row items-center my-3 p-3 justify-between bg-slate-100">
        <Text className="text-2xl font-bold text-gray-800 ">Outlets</Text>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="px-4 py-2 rounded-lg bg-red-500 w-24 items-center"
        >
          <Text className="text-sm font-medium text-stone-100">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-4 space-x-3 gap-5">
        <TouchableOpacity
          className="flex-1 bg-stone-500 py-3 rounded-lg justify-center"
          onPress={insertOutlets}
        >
          <Text className="text-white text-center font-semibold">
            Insert Outlets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-red-700 py-3 rounded-lg justify-center"
          onPress={deleteOutlets}
        >
          <Text className="text-white text-center font-semibold">
            Delete All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-red-700 py-3 rounded-lg justify-center"
          onPress={() =>
            router.push({ pathname: "/(protected)/(tabs)/(map)/map" })
          }
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
