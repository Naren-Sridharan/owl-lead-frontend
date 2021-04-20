import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";

export default PSOFinder = ({ navigation, route }) => {
	return (
		<View style={styles.container}>
			<Map
				markers={[
					{
						latlng: { latitude: -37.8177, longitude: 144.9514 },
						place: "Spencer St, Docklands VIC 3008",
						level: "LOW",
						tintColor: "red",
						distance: null,
						duration: null,
						id: 1,
					},
					{
						latlng: { latitude: -37.8181, longitude: 144.9668 },
						place: "Flinders St, Melbourne VIC 3000",
						level: "HIGH",
						tintColor: "green",
						distance: null,
						duration: null,
						id: 2,
					},
				]}
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
