import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

export const useGetOutlets = () => {
	const db = useSQLiteContext();
	const [outlets, setOutlets] = useState([]);

	const getOutletsData = useCallback(async () => {
		try {
			const data = await db.getAllAsync(
				`SELECT * FROM outletStore ORDER BY date DESC`,
			);
			setOutlets(data);
		} catch (error) {
			console.log("Failed to get outlets", error);
		}
	}, [db]);

	useEffect(() => {
		getOutletsData();
	}, [getOutletsData]);

	return {
		outlets,
		setOutlets,
		refreshOutlets: getOutletsData,
	};
};
