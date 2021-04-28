import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../shared/constants";
import { Actions } from "../redux/actions";

const MenuButton = ({
	onPress,
	source,
	testID,
	button_style = {},
	icon_style = {},
}) => (
	<TouchableOpacity
		onPress={onPress}
		style={{ ...styles.menu_button, ...button_style }}
		testID={testID}
	>
		<Image source={source} style={{ ...styles.icon, ...icon_style }} />
	</TouchableOpacity>
);

const Menu = ({ navigation }) => {
	const show_options = useSelector((state) => state.show_options);

	const dispatch = useDispatch();

	const onNewScreen = (page) => () => {
		dispatch(Actions.hideOptions());
		navigation.navigate(page);
	};

	const buttons = (
		<>
			<MenuButton
				onPress={onNewScreen("Home")}
				button_style={{ top: "70%" }}
				source={require("../assets/images/home.png")}
				icon_style={{ tintColor: COLORS.dark }}
				testID="homeButton"
			/>
			<MenuButton
				onPress={onNewScreen("Anyone Around?")}
				button_style={{ top: "55%" }}
				source={require("../assets/images/anyone_around.png")}
				icon_style={{ tintColor: COLORS.dark }}
				testID="anyoneAroundButton"
			/>
			<MenuButton
				onPress={onNewScreen("PSO Finder")}
				button_style={{ top: "40%" }}
				source={require("../assets/images/pso_finder.png")}
				icon_style={{ tintColor: COLORS.dark }}
				testID="psoFinderButton"
			/>
			<MenuButton
				onPress={onNewScreen("Emergency Contacts")}
				button_style={{ top: "25%" }}
				source={require("../assets/images/emergency_contact.png")}
				icon_style={{ tintColor: "red" }}
				testID="emergencyContactButton"
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
				testID="menuButton"
			/>
			<MenuButton
				onPress={onNewScreen("Emergency")}
				button_style={{ top: "85%", left: "3%" }}
				source={require("../assets/images/emergency.png")}
				testID="emergencyButton"
			/>
			{show_options && buttons}
		</>
	);
};

const styles = StyleSheet.create({
	menu_button: {
		position: "absolute",
		width: 75,
		height: 75,
		right: "3%",
		borderRadius: 75,
		borderWidth: 3,
		borderColor: COLORS.highlight,
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

export default Menu;
