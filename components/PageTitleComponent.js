import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../shared/constants";

export default function PageTitle({ text }) {
	return (
		<View style={styles.textView}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	textView: {
		position: "absolute",
		height: "10%",
		top: "85%",
		right: "3%",
		left: "10%",
		paddingRight: "10%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		backgroundColor: COLORS.dark,
	},
	text: {
		color: COLORS.light,
		fontWeight: "bold",
		fontSize: 30,
	},
});
