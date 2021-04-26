import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../shared/constants";

const Loading = () => (
	<View style={styles.container}>
		<ActivityIndicator
			size="large"
			color={COLORS.dark}
			testID="activityIndicator"
		/>
		<Text style={styles.loadingText} testID="loadingText">
			Loading . . .
		</Text>
	</View>
);

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

export default Loading;
