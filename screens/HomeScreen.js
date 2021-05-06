import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";

const Home = ({ navigation, route }) => (
	<View style={styles.container}>
		<Map id="Map_Home" />
		<Menu navigation={navigation} route={route} info={true} />
		<PageTitle navigation={navigation} name={route.name} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Home;
