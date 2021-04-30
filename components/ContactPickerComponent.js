import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
	Alert,
	TouchableOpacity,
	Image,
	StyleSheet,
	Text,
	View,
	Linking,
} from "react-native";
import { Actions } from "../redux/actions";
import * as Contacts from "expo-contacts";
import { COLORS } from "../shared/constants";
import * as IntentLauncherAndroid from "expo-intent-launcher";

const openSetting = () => {
	Platform.OS == "ios"
		? Linking.openURL("app-settings:")
		: IntentLauncherAndroid.startActivityAsync(
				IntentLauncherAndroid.ACTION_PRIVACY_SETTINGS
		  );
};

const ContactPicker = () => {
	const contacts = useSelector((state) => state.contacts);
	const contacts_access = useSelector((state) => state.contacts_access);
	const emergency_contacts = useSelector((state) => state.emergency_contacts);

	const [selectedContact, setSelectedContact] = useState(0);

	const dispatch = useDispatch();

	const getContactsAsync = async () => {
		try {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === "granted") {
				dispatch(Actions.allowContactsAccess());
				const { data } = await Contacts.getContactsAsync({
					fields: [
						Contacts.Fields.FirstName,
						Contacts.Fields.LastName,
						Contacts.Fields.PhoneNumbers,
					],
				});

				dispatch(
					Actions.setContacts(
						data
							.filter((contact) => contact.phoneNumbers)
							.map((contact) =>
								contact.phoneNumbers
									.filter((phone_number) => !phone_number.number.includes(" "))
									.map((phone_number) => ({
										id: contact.id,
										name: contact.firstName,
										surname: contact.lastName ? contact.lastName : "",
										phone_number: phone_number.number
											.replace(" ", "")
											.replace("-", ""),
									}))
							)
							.flat(Infinity)
					)
				);
			} else {
				if (contacts_access == null) {
					dispatch(Actions.denyContactsAccess());
				} else if (!contacts_access) {
					Alert.alert(
						"No Permission for Accessing Contacts",
						"Permission to access contacts was denied, emergency contact feature will be disabled unless contact access is reactivated in settings. Do you wish to change settings?",
						[
							{
								text: "Yes",
								onPress: openSetting,
							},
							{
								text: "No",
								onPress: () => console.log("Cancel Pressed"),
								style: "cancel",
							},
						]
					);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (contacts_access == null || contacts_access) {
			getContactsAsync();
		}
	}, [contacts_access]);

	const onAddEmergencyContact = () => {
		if (emergency_contacts.length == 3) {
			Alert.alert(
				"Emergency Contacts Limit Reached",
				"You can add only a maximum of 3 contacts as emergency contacts. Remove an emergency contact to add more."
			);
		} else if (
			emergency_contacts
				.map((ct) => ct.id)
				.includes(contacts[selectedContact].id)
		) {
			Alert.alert(
				"Already an Emergency Contact",
				`${contacts[selectedContact].name} (${contacts[selectedContact].phone_number}) is already an emergency contact. Try adding someone else.`
			);
		} else {
			dispatch(Actions.addEmergencyContact(contacts[selectedContact]));
		}
	};

	const existing_contacts = (
		<View style={styles.container}>
			<Text style={styles.title}>Add New Emergency Contact</Text>
			<View style={styles.picker_container}>
				<Picker
					selectedValueZ={selectedContact}
					style={styles.picker}
					itemStyle={styles.picker_item}
					onValueChange={setSelectedContact}
				>
					{contacts.map((contact, index) => (
						<Picker.Item
							key={index}
							label={`${contact.name} ${contact.surname} (${contact.phone_number})`}
							value={index}
						/>
					))}
				</Picker>
			</View>
			<TouchableOpacity onPress={onAddEmergencyContact} style={styles.button}>
				<Text style={styles.text}>Add as Emergency Contact</Text>
				<Image
					source={require("../assets/images/add_contact.png")}
					style={styles.button_image}
				/>
			</TouchableOpacity>
		</View>
	);

	const access_button = (
		<TouchableOpacity onPress={getContactsAsync} style={styles.button}>
			<Text>Access Existing Contacts</Text>
		</TouchableOpacity>
	);

	return contacts_access ? existing_contacts : access_button;
};

export default ContactPicker;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: "30%",
		justifyContent: "center",
		margin: 10,
	},
	picker_container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: COLORS.light,
		borderColor: COLORS.dark,
		borderWidth: 2,
		borderRadius: 10,
	},
	text: {
		fontSize: 17,
		color: COLORS.dark,
		margin: 10,
		fontWeight: "bold",
	},
	picker: {
		height: 88,
		width: "100%",
		color: COLORS.dark,
	},
	picker_item: {
		height: 88,
		color: COLORS.dark,
	},
	button: {
		width: "100%",
		height: 40,
		borderRadius: 10,
		justifyContent: "center",
		backgroundColor: COLORS.levels.LOW,
		alignItems: "center",
		marginTop: 30,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	button_image: {
		width: 25,
		height: 25,
		marginLeft: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		width: "90%",
		color: COLORS.light,
		textAlign: "center",
		alignSelf: "center",
		marginBottom: 10,
	},
});
