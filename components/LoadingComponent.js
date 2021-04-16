import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../shared/constants";

export default function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={COLORS.dark} />
			<Text style={styles.loadingText}>Loading . . .</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	loadingText: {
		color: COLORS.dark,
		fontSize: 30,
		fontWeight: "bold",
	},
});
