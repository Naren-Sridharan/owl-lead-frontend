import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/LoginScreen";
import Home from "../screens/HomeScreen";
import AnyoneAround from "../screens/AnyoneAroundScreen";
import PSOFinder from "../screens/PSOFinderScreen";
import Emergency from "../screens/EmergencyScreen";
import EmergencyContact from "../screens/EmergencyContactScreen";
import Intro from "../screens/IntroScreen";

import { fetchPedestrianCounts, fetchPSOStations } from "../shared/loaders";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Linking } from "react-native";
import { EMERGENCY_NUMBER } from "../shared/constants";

const Tab = createBottomTabNavigator();

const Main = () => {
	const pedestrian_counts = useSelector((state) => state.pedestrian_counts);

	const dispatch = useDispatch();

	React.useEffect(() => {
		Alert.alert(
			"ARE YOU IN IMMEDIATE DANGER?",
			"If you are in immmediate danger, please click yes to be redirected to 000",
			[
				{
					text: "Yes",
					onPress: () => Linking.openURL(`tel:${EMERGENCY_NUMBER}`),
				},
				{
					text: "No",
					style: "cancel",
				},
			]
		);
		dispatch(fetchPedestrianCounts());
		dispatch(fetchPSOStations());
	}, [dispatch]);

	const options = {
		tabBarVisible: false,
	};

	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Login">
				<Tab.Screen name="Login" component={Login} options={options} />
				<Tab.Screen name="Intro" component={Intro} options={options} />
				<Tab.Screen name="Home" component={Home} options={options} />
				<Tab.Screen
					name="Anyone Around?"
					component={AnyoneAround}
					options={options}
				/>
				<Tab.Screen name="PSO Finder" component={PSOFinder} options={options} />
				<Tab.Screen name="Emergency" component={Emergency} options={options} />
				<Tab.Screen
					name="Emergency Contacts"
					component={EmergencyContact}
					options={options}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Main;
