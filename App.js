import "react-native-gesture-handler";
import * as React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeScreen";
import AnyoneAround from "./screens/AnyoneAroundScreen";
import PSOFinder from "./screens/PSOFinderScreen";
import EmergencyCall from "./screens/EmergencyCallScreen";

const store = createStore(reducer);
const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Anyone Around?" component={AnyoneAround} />
					<Stack.Screen name="PSO Finder" component={PSOFinder} />
					<Stack.Screen name="Emergency Call" component={EmergencyCall} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
