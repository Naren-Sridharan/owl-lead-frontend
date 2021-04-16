import "react-native-gesture-handler";
import * as React from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/HomeScreen";
import AnyoneAround from "./screens/AnyoneAroundScreen";
import PSOFinder from "./screens/PSOFinderScreen";
import EmergencyCall from "./screens/EmergencyCallScreen";
import { COLORS } from "./shared/constants";

const store = createStore(reducer);
const Tab = createBottomTabNavigator();

export default function App() {
	const options = {
		tabBarVisible: false,
	};

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Tab.Navigator initialRouteName="Home">
					<Tab.Screen name="Home" component={Home} options={options} />
					<Tab.Screen
						name="Anyone Around?"
						component={AnyoneAround}
						options={options}
					/>
					<Tab.Screen
						name="PSO Finder"
						component={PSOFinder}
						options={options}
					/>
					<Tab.Screen
						name="Emergency Call"
						component={EmergencyCall}
						options={options}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
