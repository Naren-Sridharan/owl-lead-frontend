import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/HomeScreen";
import AnyoneAround from "../screens/AnyoneAroundScreen";
import PSOFinder from "../screens/PSOFinderScreen";
import Emergency from "../screens/EmergencyScreen";

import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { fetchPedestrianCounts, fetchPSOStations } from "../shared/loaders";
import {
	FETCH_PEDESTRIAN_COUNTS,
	FETCH_PSO_STATIONS,
} from "../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../App";

TaskManager.defineTask(FETCH_PEDESTRIAN_COUNTS, async () => {
	try {
		console.log("Background Fetch Pedestrian Counts initiated");
		const newData = store.dispatch(fetchPedestrianCounts());
		console.log(
			"Background Fetch Pedestrian Counts Completed: ",
			newData ? "Sucessful" : "Unsuccessful"
		);
		return newData
			? BackgroundFetch.Result.NewData
			: BackgroundFetch.Result.NoData;
	} catch (error) {
		console.log(error);
		return BackgroundFetch.Result.Failed;
	}
});

const registerBackgroundPedestrianCountsTask = async () => {
	try {
		await BackgroundFetch.registerTaskAsync(FETCH_PEDESTRIAN_COUNTS, {
			minimumInterval: 15 * 60, // seconds
		});
	} catch (err) {
		console.log("Background Fetch Pedestrian Counts Registration Failed:", err);
	}
};

const Tab = createBottomTabNavigator();

const Main = () => {
	const pedestrian_counts = useSelector((state) => state.pedestrian_counts);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchPedestrianCounts());
		dispatch(fetchPSOStations());
		registerBackgroundPedestrianCountsTask();
	}, [dispatch]);

	const options = {
		tabBarVisible: false,
	};

	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Home">
				<Tab.Screen name="Home" component={Home} options={options} />
				<Tab.Screen
					name="Anyone Around?"
					component={AnyoneAround}
					options={options}
				/>
				<Tab.Screen name="PSO Finder" component={PSOFinder} options={options} />
				<Tab.Screen name="Emergency" component={Emergency} options={options} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Main;
