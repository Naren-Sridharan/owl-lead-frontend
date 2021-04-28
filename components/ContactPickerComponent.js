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
} from "react-native";
import { Actions } from "../redux/actions";
import * as Contacts from "expo-contacts";
import { COLORS } from "../shared/constants";

const ContactPicker = () => {
	const [selectedContact, setSelectedContact] = useState("");
	const contacts = useSelector((state) => state.contacts);
	const emergency_contacts = useSelector((state) => state.emergency_contacts);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const { status } = await Contacts.requestPermissionsAsync();
				if (status === "granted") {
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
									contact.phoneNumbers.map((phone_number) => ({
										id: contact.id,
										name: `${contact.firstName} ${contact.lastName}`,
										phone_number: phone_number.number.replace("/s/g", ""),
									}))
								)
								.flat(Infinity)
						)
					);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch]);

	const onAddEmergencyContact = () => {
		if (emergency_contacts.length == 3) {
			Alert.alert(
				"Emergency Contacts Limit Reached",
				"You can add only a maximum of 3 contacts as emergency contacts. Remove an emergency contact to add more."
			);
		} else if (
			emergency_contacts.map((ct) => ct.id).includes(selectedContact.id)
		) {
			Alert.alert(
				"Already an Emergency Contact",
				`${selectedContact.name} (${selectedContact.phone_number}) is already an emergency contact. Try adding someone else.`
			);
		} else {
			dispatch(Actions.addEmergencyContact(selectedContact));
		}
	};

	return (
		<View style={styles.container}>
			<Picker
				selectedContact={selectedContact}
				style={styles.picker}
				onValueChange={setSelectedContact}
			>
				{contacts
					.filter(
						(contact) =>
							!emergency_contacts.map((ct) => ct.id).includes(contact.id)
					)
					.map((contact) => (
						<Picker.Item
							key={contact.id}
							label={`${contact.name} (${contact.phone_number})`}
							value={contact}
						/>
					))}
			</Picker>
			<TouchableOpacity onPress={onAddEmergencyContact} style={styles.button}>
				<Text>
					Add as Emergency Contact{" "}
					<Image
						source={require("../assets/images/add_contact.png")}
						style={styles.button_image}
					/>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ContactPicker;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: "25%",
		borderRadius: 20,
		backgroundColor: COLORS.light,
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	picker: {
		height: 50,
		width: "90%",
		color: COLORS.dark,
		borderWidth: 2,
	},
	button: {
		width: "90%",
		height: 40,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.highlight,
	},
	button_image: {
		width: 20,
		height: 20,
	},
});
