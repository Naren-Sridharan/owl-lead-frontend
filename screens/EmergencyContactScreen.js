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
			<TouchableOpacity
				key={index}
				onPress={removeEmergencyContact}
				style={styles.button}
			>
				<Text style={styles.button_text}>
					{item.name} ({item.phone_number})
				</Text>
				<Image
					source={require("../assets/images/delete_contact.png")}
					style={styles.button_image}
				/>
			</TouchableOpacity>
		);
	};
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Saved Emergency Contacts: {emergency_contacts.length}.
			</Text>
			<FlatList
				style={styles.list}
				data={emergency_contacts}
				renderItem={renderContact}
				keyExtractor={(contact) => contact.id}
			/>
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
		flexGrow: 0,
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		width: "90%",
		color: COLORS.light,
		textAlign: "center",
		marginBottom: 10,
	},
	button: {
		width: "100%",
		height: 40,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.highlight,
		marginBottom: 10,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	button_text: {
		fontSize: 17,
		fontWeight: "bold",
	},
	button_image: {
		width: 40,
		height: 40,
		tintColor: "red",
		marginLeft: 5,
	},
});

export default EmergencyContact;
