import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";

export default function PSOFinder({ navigation }) {
	return (
		<View style={styles.container}>
			<Map
				markers={[
					{
						latlng: { latitude: -37.8177, longitude: 144.9514 },
						title: "Southern Cross Station",
						description: {
							place: "Spencer St, Docklands VIC 3008",
							level: "LOW",
						},
						tintColor: "red",
					},
					{
						latlng: { latitude: -37.8181, longitude: 144.9668 },
						title: "Flinders Street Station",
						description: {
							place: "Flinders St, Melbourne VIC 3000",
							level: "HIGH",
						},
						tintColor: "green",
					},
				]}
				level_name={"Safety"}
				marker_icon={require("../assets/images/pso_finder.png")}
			/>
			<Menu navigation={navigation} />
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
