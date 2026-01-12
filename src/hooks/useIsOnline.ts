import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useIsOnline = () => {
	const [isOnline, setIsOnline] = useState(false);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			const online = state.isConnected && state.isInternetReachable;
			setIsOnline(online);
		});

		return () => unsubscribe();
	}, []);

	return isOnline;
};
