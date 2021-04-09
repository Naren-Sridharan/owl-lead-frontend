import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EmergencyCall({ navigation }) {
	return (
		<View style={StyleSheet.container}>
			<Text>Emergency Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
