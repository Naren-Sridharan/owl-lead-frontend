import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../shared/constants";

export const Loading = () => {
	return (
		<View style={styles.loadingView}>
			<ActivityIndicator size="large" color={COLORS.purple} />
			<Text style={styles.loadingText}>Loading . . .</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingView: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	loadingText: {
		color: COLORS.orange,
		fontSize: 14,
		fontWeight: "bold",
	},
});
