import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import Header from "@/src/components/HeaderBack";

const OutletDetailsScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const db = useSQLiteContext();
	const [outlet, setOutlet] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOutlet = async () => {
			try {
				const result = await db.getFirstAsync(
					"SELECT * FROM outletStore WHERE id = ?",
					[id],
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
		<View className="flex-1 bg-stone-100">
			<Header title="Outlet Details" showBack />

			<View className="m-4 rounded-xl bg-white p-4">
				<Text className="text-xl font-bold text-gray-900">{outlet.name}</Text>

				<Text className="mt-1 text-gray-500">
					{outlet.street}, {outlet.city}
				</Text>

				<View className="my-4 h-[1px] bg-gray-100" />

				<View className="gap-3">
					<InfoRow label="Status" value={outlet.status} />
					<InfoRow label="Date" value={outlet.date} />
					<InfoRow label="Latitude" value={outlet.latitude} />
					<InfoRow label="Longitude" value={outlet.longitude} />
				</View>
			</View>

			<View className="px-4">
				<TouchableOpacity
					className="rounded-xl bg-black py-4 items-center"
					activeOpacity={0.8}
					onPress={() =>
						router.push({
							pathname: "/(protected)/(tabs)/(map)/map",
							params: outlet,
						})
					}
				>
					<Text className="text-white font-semibold text-base">
						View on Map
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
	<View className="flex-row justify-between">
		<Text className="text-gray-500">{label}</Text>
		<Text className="font-medium text-gray-900">{value}</Text>
	</View>
);

export default OutletDetailsScreen;
