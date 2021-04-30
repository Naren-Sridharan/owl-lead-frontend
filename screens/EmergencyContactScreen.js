import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Alert,
	FlatList,
	Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ContactPicker from "../components/ContactPickerComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";
import { Actions } from "../redux/actions";
import { COLORS } from "../shared/constants";

const EmergencyContact = ({ navigation, route }) => {
	const emergency_contacts = useSelector((state) => state.emergency_contacts);
	const dispatch = useDispatch();

	const renderContact = ({ item, index }) => {
		const removeEmergencyContact = () =>
			Alert.alert(
				"Please Confirm Removal",
				`Are you sure you want to remove ${item.name} (${item.phone_number}) from your emergency contacts?`,
				[
					{
						text: "Yes",
						onPress: () => dispatch(Actions.removeEmergencyContact(item)),
					},
					{
						text: "No",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
				]
			);
		return (
			<View style={styles.contact_view}>
				<Text style={styles.contact_text}>
					{item.name} ({item.phone_number})
				</Text>
				<TouchableOpacity
					key={index}
					onPress={removeEmergencyContact}
					style={styles.delete_button}
				>
					<Image
						source={require("../assets/images/delete_contact.png")}
						style={styles.delete_button_image}
					/>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Saved Emergency Contacts</Text>
			<Text style={styles.text}>({emergency_contacts.length} out of 3)</Text>
			{emergency_contacts.length && (
				<FlatList
					style={styles.list}
					data={emergency_contacts}
					renderItem={renderContact}
					keyExtractor={(contact) => contact.id}
				/>
			)}
			<ContactPicker />
			<Menu navigation={navigation} route={route} />
			<PageTitle navigation={navigation} name={route.name} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.dark,
	},
	list: {
		width: "90%",
		height: 180,
		flexGrow: 0,
		backgroundColor: COLORS.light,
		borderColor: COLORS.levels.LOW,
		borderRadius: 10,
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		width: "90%",
		color: COLORS.light,
		textAlign: "center",
		marginBottom: 10,
	},
	contact_view: {
		width: "100%",
		height: 60,
		flexDirection: "row",
		borderWidth: 2,
		borderColor: COLORS.dark,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	contact_text: {
		fontSize: 17,
		fontWeight: "bold",
		color: COLORS.dark,
		left: 0,
	},
	delete_button: {
		width: 40,
		height: 40,
		borderRadius: 40,
		backgroundColor: COLORS.light,
		alignItems: "center",
		justifyContent: "center",
		right: 0,
	},
	delete_button_image: {
		width: 40,
		height: 40,
		tintColor: "red",
		alignSelf: "center",
	},
});

export default EmergencyContact;
