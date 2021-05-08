import React, { useState } from "react";
import {
	StyleSheet,
	Image,
	TouchableOpacity,
	Linking,
	Modal,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, EMERGENCY_NUMBER } from "../shared/constants";
import { Actions } from "../redux/actions";
import PageTitle from "./PageTitleComponent";
import Information from "./InformationComponent";
import * as SMS from "expo-sms";
import { BlurView } from "expo-blur";
import { IMAGES } from "../shared/constants";

const MenuButton = ({
	name,
	onPress,
	source,
	testID,
	button_style = {},
	icon_style = {},
}) => (
	<>
		{name && <PageTitle name={name} top={button_style.top} onPress={onPress} />}
		<TouchableOpacity
			onPress={onPress}
			style={{ ...styles.menu_button, ...button_style }}
			testID={testID}
		>
			<Image source={source} style={{ ...styles.icon, ...icon_style }} />
		</TouchableOpacity>
	</>
);

const Menu = ({ navigation, route, info = false }) => {
	const [show_information, setShowInformation] = useState(false);
	const toggleShowInformation = () => setShowInformation(!show_information);
	const show_options = useSelector((state) => state.show_options);
	const show_emergency_options = useSelector(
		(state) => state.show_emergency_options
	);
	const emergency_contacts = useSelector((state) => state.emergency_contacts);
	const address = useSelector((state) => state.address);

	const dispatch = useDispatch();

	const onNewScreen = (page, status = "") => () => {
		dispatch(Actions.hideOptions());
		dispatch(Actions.hideEmergencyOptions());
		navigation.navigate(page, { status: status });
	};

	const buttons = (
		<BlurView
			tint="dark"
			intensity={50}
			style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
		>
			<MenuButton
				name="Home"
				onPress={onNewScreen("Home")}
				button_style={{ top: "75%" }}
				source={IMAGES.home}
				icon_style={{ tintColor: COLORS.dark }}
				testID="homeButton"
			/>
			<MenuButton
				name="Anyone Around?"
				onPress={onNewScreen("Anyone Around?")}
				button_style={{ top: "62.5%" }}
				source={IMAGES.anyone_around}
				icon_style={{ tintColor: COLORS.dark }}
				testID="anyoneAroundButton"
			/>
			<MenuButton
				name="PSO Finder"
				onPress={onNewScreen("PSO Finder")}
				button_style={{ top: "50%" }}
				source={IMAGES.pso_finder}
				icon_style={{ tintColor: COLORS.dark }}
				testID="psoFinderButton"
			/>
			<MenuButton
				name="Intro"
				onPress={onNewScreen("Intro")}
				button_style={{ top: "37.5%" }}
				source={IMAGES.intro}
				icon_style={{ tintColor: COLORS.dark }}
				testID="introButton"
			/>
		</BlurView>
	);

	const emergency_buttons = (
		<BlurView
			intensity={50}
			tint="dark"
			style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
		>
			<MenuButton
				name="Emergency Call"
				onPress={() => {
					Linking.openURL(`tel:${EMERGENCY_NUMBER}`);
					onNewScreen(
						"Emergency",
						`Location:\n${address ? address : "No Location given"}`
					)();
				}}
				button_style={{ top: "75%", left: "3%" }}
				source={IMAGES.emergency_call}
				testID="emergencyCallButton"
			/>
			<MenuButton
				name="SOS"
				onPress={() => {
					(async () => {
						const isAvailable = await SMS.isAvailableAsync();
						let status = "";
						if (isAvailable) {
							if (emergency_contacts.length) {
								try {
									const { result } = SMS.sendSMSAsync(
										emergency_contacts.map((contact) => contact.phone_number),
										`Emergency! Please Help! ${
											address ? `I am at ${address}.` : ""
										} Try calling me first! Please come immediately or inform the police if I don't pick up.`
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
				button_style={{ top: "62.5%", left: "3%" }}
				source={IMAGES.sos}
				testID="sosButton"
			/>
			<MenuButton
				name="Emergency Contacts"
				onPress={onNewScreen("Emergency Contacts")}
				button_style={{ top: "50%", left: "3%" }}
				source={IMAGES.emergency_contact}
				icon_style={{ tintColor: "red" }}
				testID="emergencyContactButton"
			/>
		</BlurView>
	);

	return (
		<>
			<MenuButton
				onPress={() => {
					dispatch(Actions.hideEmergencyOptions());
					show_options
						? dispatch(Actions.hideOptions())
						: dispatch(Actions.showOptions());
				}}
				button_style={{ top: "87.5%" }}
				source={IMAGES.owl_lead}
				testID="menuButton"
			/>

			{show_options && buttons}

			<MenuButton
				onPress={() => {
					dispatch(Actions.hideOptions());
					show_emergency_options
						? dispatch(Actions.hideEmergencyOptions())
						: dispatch(Actions.showEmergencyOptions());
				}}
				button_style={{ top: "87.5%", left: "3%" }}
				source={IMAGES.emergency}
				testID="emergencyButton"
			/>

			{show_emergency_options && emergency_buttons}

			{info && (
				<MenuButton
					onPress={toggleShowInformation}
					button_style={{ top: "4.5%", right: "3%", width: 45, height: 45 }}
					icon_style={{ tintColor: COLORS.dark }}
					source={IMAGES.information}
					testID="informationButton"
				/>
			)}
			<Modal
				animationType="slide"
				visible={show_information}
				onRequestClose={toggleShowInformation}
			>
				<View style={styles.container}>
					<PageTitle name={`Info: ${route.name}`} />
					<MenuButton
						onPress={toggleShowInformation}
						button_style={{ top: "4.5%", right: "3%", width: 45, height: 45 }}
						icon_style={{ tintColor: COLORS.dark }}
						source={IMAGES.close}
						testID="closeButton"
					/>
					<Information page={route.name} />
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.dark,
		paddingVertical: 10,
	},
	menu_button: {
		position: "absolute",
		width: 70,
		height: 70,
		right: "3%",
		borderRadius: 70,
		borderWidth: 2,
		borderColor: COLORS.dark,
		backgroundColor: COLORS.light,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 999,
	},
	icon: {
		width: 45,
		height: 45,
		opacity: 1,
	},
});

export default Menu;
