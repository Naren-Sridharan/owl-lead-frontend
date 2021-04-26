import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../shared/constants";

const PageTitle = ({ route }) => (
	<View style={styles.textView}>
		<Text style={styles.text} testID="pageTitle">
			{route.name}
		</Text>
	</View>
);

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
	},
	text: {
		color: COLORS.light,
		fontWeight: "bold",
		fontSize: 20,
	},
});

export default PageTitle;
