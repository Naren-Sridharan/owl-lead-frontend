import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";

const PSOFinder = ({ navigation, route }) => {
	const pso_stations = useSelector((state) => state.pso_stations);
	return (
		<View style={styles.container}>
			<Map
				markers={pso_stations}
				level_name={"Safety"}
				marker_icon={require("../assets/images/pso_finder.png")}
			/>
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
	},
});

export default PSOFinder;
