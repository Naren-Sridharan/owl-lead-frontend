import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducer from "./reducer";

export const ConfigureStore = () => {
	const config = {
		key: "root",
		storage: AsyncStorage,
		blacklist: [
			"show_options",
			"location_access",
			"location",
			"address",
			"isLoading",
			"errMess",
			"pedestrian_counts",
			"pso_stations",
			"contacts",
			"contacts_access",
		],
		debug: false,
	};

	const store = createStore(
		persistReducer(config, reducer),
		applyMiddleware(thunk)
	);

	const persistor = persistStore(store);
	return { persistor, store };
};
