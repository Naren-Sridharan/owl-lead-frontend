import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, EMERGENCY_NUMBER } from "../shared/constants";
import { Actions } from "../redux/actions";
import { Linking } from "react-native";

const MenuButton = ({
	onPress,
	source,
	button_style = {},
	icon_style = {},
}) => (
	<TouchableOpacity
		onPress={onPress}
		style={{ ...styles.menu_button, ...button_style }}
	>
		<Image source={source} style={{ ...styles.icon, ...icon_style }} />
	</TouchableOpacity>
);

export default Menu = ({ navigation }) => {
	const show_options = useSelector((state) => state.show_options);

	const dispatch = useDispatch();

	const onNewScreen = (page) => () => {
		dispatch(Actions.hideOptions());
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
		navigation.navigate(page);
	};

	const buttons = (
		<>
			<MenuButton
				onPress={onNewScreen("Home")}
				button_style={{ top: "70%" }}
				source={require("../assets/images/home.png")}
				icon_style={{ tintColor: COLORS.dark }}
			/>
			<MenuButton
				onPress={onNewScreen("Anyone Around?")}
				button_style={{ top: "55%" }}
				source={require("../assets/images/anyone_around.png")}
				icon_style={{ tintColor: COLORS.dark }}
			/>
			<MenuButton
				onPress={onNewScreen("PSO Finder")}
				button_style={{ top: "40%" }}
				source={require("../assets/images/pso_finder.png")}
				icon_style={{ tintColor: COLORS.dark }}
			/>
		</>
	);

	return (
		<>
			<MenuButton
				onPress={() =>
					show_options
						? dispatch(Actions.hideOptions())
						: dispatch(Actions.showOptions())
				}
				button_style={{ top: "85%" }}
				source={require("../assets/images/owl_lead.png")}
			/>
			<MenuButton
				onPress={() => {
					Linking.openURL(`tel:${EMERGENCY_NUMBER}`);
					onNewScreen("Emergency")();
				}}
				button_style={{ top: "85%", left: "3%" }}
				source={require("../assets/images/emergency.png")}
			/>
			{show_options ? buttons : <></>}
		</>
	);
};

styles = StyleSheet.create({
	menu_button: {
		position: "absolute",
		width: 75,
		height: 75,
		right: "3%",
		borderRadius: 75,
		zIndex: 2,
		backgroundColor: COLORS.light,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 999,
	},
	icon: {
		width: 50,
		height: 50,
		opacity: 1,
	},
});
