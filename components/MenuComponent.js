import React from "react";
import {
	StyleSheet,
	Image,
	TouchableOpacity,
	Linking,
	Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, EMERGENCY_NUMBER } from "../shared/constants";
import { Actions } from "../redux/actions";
import PageTitle from "./PageTitleComponent";
import * as SMS from "expo-sms";

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
	const emergency_contacts = useSelector((state) => state.emergency_contacts);
	const address = useSelector((state) => state.address);

	const dispatch = useDispatch();

	const onNewScreen = (page, status = "") => () => {
		dispatch(Actions.hideOptions());
		navigation.navigate(page, { status: status });
	};

	const buttons = (
		<>
			<PageTitle name="Home" top="70%" />
			<MenuButton
				onPress={onNewScreen("Home")}
				button_style={{ top: "70%" }}
				source={require("../assets/images/home.png")}
				icon_style={{ tintColor: COLORS.dark }}
				testID="homeButton"
			/>
			<PageTitle name="Anyone Around?" top="55%" />
			<MenuButton
				onPress={onNewScreen("Anyone Around?")}
				button_style={{ top: "55%" }}
				source={require("../assets/images/anyone_around.png")}
				icon_style={{ tintColor: COLORS.dark }}
				testID="anyoneAroundButton"
			/>
			<PageTitle name="PSO Finder" top="40%" />
			<MenuButton
				onPress={onNewScreen("PSO Finder")}
				button_style={{ top: "40%" }}
				source={require("../assets/images/pso_finder.png")}
				icon_style={{ tintColor: COLORS.dark }}
				testID="psoFinderButton"
			/>
			<PageTitle name="Emergency Contacts" top="25%" />
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
				onPress={() => {
					Linking.openURL(`tel:${EMERGENCY_NUMBER}`);
					(async () => {
						const isAvailable = await SMS.isAvailableAsync();
						let status = "";
						if (isAvailable) {
							if (emergency_contacts.length) {
								try {
									const { result } = SMS.sendSMSAsync(
										emergency_contacts.map((contact) => contact.phone_number),
										`Emergency! Please Help! I am at ${address}. Try calling me first! Please come immediately or inform the police if I don't pick up.`
									);
									status = "SOS SMSs were sent to Emergency Contacts.";
								} catch (error) {
									console.log(error);
								}
							} else {
								status = "No Emergency Contacts Saved. No SOS SMSs were sent.";
							}
						} else {
							status =
								"SMS Facility unavailable on your phone. Could not contact emergency contacts.";
						}
						onNewScreen("Emergency", status)();
					})();
				}}
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
		borderColor: COLORS.levels.MODERATE,
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
