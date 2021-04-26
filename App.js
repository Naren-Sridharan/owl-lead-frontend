import React from "react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/lib/integration/react";
import Loading from "./components/LoadingComponent";
import Main from "./components/MainComponent";

export const { persistor, store } = ConfigureStore();

const App = () => (
	<Provider store={store}>
		<PersistGate loading={<Loading />} persistor={persistor}>
			<Main />
		</PersistGate>
	</Provider>
);

export default App;
