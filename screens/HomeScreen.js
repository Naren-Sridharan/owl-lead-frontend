import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";

export default function Home({ navigation }) {
	return (
		<View style={styles.container}>
			<Map />
			<Menu navigation={navigation} />
			<PageTitle text="Home" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
