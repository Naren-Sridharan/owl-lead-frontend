import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../shared/constants";

const PageTitle = ({ name, top = "85%" }) => (
	<View style={{ ...styles.textView, top: top }}>
		<Text style={styles.text} testID="pageTitle">
			{name}
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
		borderWidth: 3,
		borderColor: COLORS.highlight,
	},
	text: {
		color: COLORS.light,
		fontWeight: "bold",
		fontSize: 19,
	},
});

export default PageTitle;
