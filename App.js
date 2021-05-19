import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/lib/integration/react";
import Loading from "./components/LoadingComponent";
import Main from "./components/MainComponent";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { fetchPedestrianCounts } from "./shared/loaders";
import { BACKGROUND_FETCH_PEDESTRIAN_COUNTS } from "./shared/constants";

export const { persistor, store } = ConfigureStore();

TaskManager.defineTask(BACKGROUND_FETCH_PEDESTRIAN_COUNTS, async () => {
	try {
		console.log("Background Fetch Pedestrian Counts initiated");
		const newData = store.dispatch(fetchPedestrianCounts());
		console.log(
			"Background Fetch Pedestrian Counts Completed: ",
			newData ? "Successful" : "Unsuccessful"
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
		await BackgroundFetch.registerTaskAsync(
			BACKGROUND_FETCH_PEDESTRIAN_COUNTS,
			{
				minimumInterval: 10 * 60, // seconds
			}
		);
		console.log("Background Fetch Pedestrian Counts Registration Successful");
	} catch (err) {
		console.log("Background Fetch Pedestrian Counts Registration Failed:", err);
	}
};

const App = () => {
	useEffect(() => {
		registerBackgroundPedestrianCountsTask();
		const interval = setInterval(async () => {
			try {
				console.log("Foreground Fetch Pedestrian Counts initiated");
				const newData = store.dispatch(fetchPedestrianCounts());
				console.log(
					"Foreground Fetch Pedestrian Counts Completed: ",
					newData ? "Successful" : "Unsuccessful"
				);
				return newData ? true : false;
			} catch (error) {
				console.log(error);
				return false;
			}
		}, 10 * 60 * 1000);
		return clearInterval(interval);
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<Main />
			</PersistGate>
		</Provider>
	);
};

export default App;
