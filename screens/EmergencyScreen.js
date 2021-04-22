import React, { useEffect } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, EMERGENCY_NUMBER } from "../shared/constants";
import PageTitle from "../components/PageTitleComponent";

export default Emergency = ({ navigation, route }) => {
	const address = useSelector((state) => state.address);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{" "}
				{`Calling ${EMERGENCY_NUMBER}! \n${
					address ? address.split(",").join("\n") : ""
				}`}
			</Text>
			<Menu navigation={navigation} route={route} />
			<PageTitle navigation={navigation} route={route} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.dark,
	},
	text: {
		fontWeight: "bold",
		fontSize: 24,
		color: "red",
		textAlign: "center",
	},
});