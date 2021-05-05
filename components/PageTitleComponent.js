import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS } from "../shared/constants";

const PageTitle = ({ name, top = "85%", onPress }) => {
	const text = (
		<Text style={styles.text} testID="pageTitle">
			{name}
		</Text>
	);

	const style = { ...styles.textView, top: top };

	return onPress ? (
		<TouchableOpacity onPress={onPress} style={style}>
			{text}
		</TouchableOpacity>
	) : (
		<View style={style}>{text}</View>
	);
};

const styles = StyleSheet.create({
	textView: {
		position: "absolute",
		height: 75,
		top: "85%",
		right: "4%",
		left: "4%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		backgroundColor: COLORS.dark,
		borderWidth: 1,
		borderColor: COLORS.light,
	},
	text: {
		color: COLORS.light,
		fontWeight: "bold",
		fontSize: 19,
	},
});

export default PageTitle;
