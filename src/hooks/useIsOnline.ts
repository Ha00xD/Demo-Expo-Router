import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

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
