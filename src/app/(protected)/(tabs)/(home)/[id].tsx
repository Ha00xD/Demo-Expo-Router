import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Header from "@/src/components/Header";
import { useTheme } from "@/src/hooks/useTheme";

const OutletDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [outlet, setOutlet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchOutlet = async () => {
      try {
        const result = await db.getFirstAsync(
          "SELECT * FROM outletStore WHERE id = ?",
          [id]
        );
        setOutlet(result);
      } finally {
        setLoading(false);
      }
    };

    fetchOutlet();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-stone-100">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-500">Loading outlet...</Text>
      </View>
    );
  }

  if (!outlet) {
    return (
      <View className="flex-1 items-center justify-center bg-stone-100">
        <Text className="text-gray-500">Outlet not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Outlet Details" showBack />

      <View
        className="m-4 rounded-xl p-4"
        style={{ backgroundColor: colors.card }}
      >
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          {outlet.name}
        </Text>

        <Text className="mt-1" style={{ color: colors.secondary }}>
          {outlet.street}, {outlet.city}
        </Text>

        <View
          className="my-4 h-[1px]"
          style={{ backgroundColor: colors.secondary }}
        />

        <View className="gap-3">
          <InfoRow label="Status" value={outlet.status} />
          <InfoRow label="Date" value={outlet.date} />
          <InfoRow label="Latitude" value={outlet.latitude} />
          <InfoRow label="Longitude" value={outlet.longitude} />
        </View>
      </View>

      <View className="px-4">
        <TouchableOpacity
          style={{ backgroundColor: colors.button }}
          className="rounded-xl py-4 items-center"
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/(protected)/(tabs)/(map)/map",
              params: outlet,
            })
          }
        >
          <Text
            style={{ color: colors.primary }}
            className="font-semibold text-base"
          >
            View on Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row justify-between">
      <Text style={{ color: colors.text }}>{label}</Text>
      <Text style={{ color: colors.text }} className="font-medium">
        {value}
      </Text>
    </View>
  );
};

export default OutletDetailsScreen;
