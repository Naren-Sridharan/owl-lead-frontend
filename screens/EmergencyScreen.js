import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Linking } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, EMERGENCY_NUMBER } from "../shared/constants";
import PageTitle from "../components/PageTitleComponent";
import Menu from "../components/MenuComponent";
import * as SMS from "expo-sms";

const Emergency = ({ navigation, route }) => {
	const address = useSelector((state) => state.address);
	const emergency_contacts = useSelector((state) => state.emergency_contacts);
	const [sms_status, setSMSStatus] = useState("");

	useFocusEffect(
		useCallback(() => {
			Linking.openURL(`tel:${EMERGENCY_NUMBER}`);
			(async () => {
				const isAvailable = await SMS.isAvailableAsync();
				if (isAvailable) {
					if (emergency_contacts.length) {
						try {
							const { result } = SMS.sendSMSAsync(
								emergency_contacts.map((contact) => contact.phone_number),
								`Emergency! Please Help! I am at ${address}. Try calling me first! Please come immediately or inform the police if I don't pick up.`
							);
							setSMSStatus("SOS SMSs were sent to Emergency Contacts.");
						} catch (error) {
							console.log(error);
						}
					} else {
						setSMSStatus("No Emergency Contacts Saved. No SOS SMSs were sent.");
					}
				} else {
					setSMSStatus(
						"SMS Facility unavailable on your phone. Could not contact emergency contacts."
					);
				}
			})();
		}, [])
	);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{" "}
				{`Calling ${EMERGENCY_NUMBER}! \n${
					address ? address.split(",").join("\n") : ""
				}`}
				{sms_status}
			</Text>
			<Menu navigation={navigation} route={route} />
			<PageTitle navigation={navigation} route={route} />
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
	text: {
		fontWeight: "bold",
		fontSize: 24,
		color: "red",
		textAlign: "center",
	},
});

export default Emergency;
