import React from "react";
import { View, StyleSheet } from "react-native";

const Information = ({ page }) => {
	const info = {
		"Anyone Around?": <></>,
		Home: <></>,
		"PSO Finder": <></>,
		"Emergency Contacts": <></>,
	};

	return <View style={styles.container}>{info[page]}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Information;
