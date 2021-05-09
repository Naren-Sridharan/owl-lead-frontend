import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";
import { IMAGES } from "../shared/constants";

const PSOFinder = ({ navigation, route }) => {
	const pso_stations = useSelector((state) => state.pso_stations);
	return (
		<View style={styles.container}>
			<Map
				markers={pso_stations}
				level_name={"PSO Probability"}
				marker_icon={IMAGES.pso_finder}
			/>
			<Menu navigation={navigation} route={route} info={true} />
			<PageTitle navigation={navigation} name={route.name} />
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
