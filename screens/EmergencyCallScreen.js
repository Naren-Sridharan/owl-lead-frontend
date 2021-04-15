import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, EMERGENCY_NUMBER } from "../shared/constants";

export default EmergencyCall = ({ navigation }) => {
	const address = useSelector((state) => state.address);

	Linking.openURL(`tel:${EMERGENCY_NUMBER}`);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{" "}
				{`Calling ${EMERGENCY_NUMBER}! \n${
					address ? address.split(",").join("\n") : ""
				}`}
			</Text>
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
