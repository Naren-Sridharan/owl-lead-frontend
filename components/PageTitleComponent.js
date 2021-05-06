import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS } from "../shared/constants";

const PageTitle = ({ name, top = "87.5%", onPress }) => {
	const style = { ...styles.textView, top: top };

	return onPress ? (
		<TouchableOpacity onPress={onPress} style={style}>
			<Text style={styles.text} testID="pageTitle">
				{name}
			</Text>
		</TouchableOpacity>
	) : (
		<View style={styles.header}>
			<Text style={styles.headerText} testID="pageTitle">
				{name}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		position: "absolute",
		top: 0,
		height: "12.5%",
		width: "100%",
		textAlign: "left",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.light,
		borderWidth: 3,
		borderColor: COLORS.dark,
	},
	headerText: {
		marginTop: 15,
		color: COLORS.dark,
		fontWeight: "bold",
		fontSize: 25,
		left: 0,
	},
	textView: {
		position: "absolute",
		height: 70,
		right: "4%",
		left: "4%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		backgroundColor: COLORS.dark,
		borderWidth: 2,
		borderColor: COLORS.light,
	},
	text: {
		color: COLORS.light,
		fontWeight: "bold",
		fontSize: 19,
	},
});

export default PageTitle;
