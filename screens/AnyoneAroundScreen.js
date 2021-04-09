import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";

export default function AnyoneAround({ navigation }) {
	return (
		<View style={styles.container}>
			<Map
				markers={[
					{
						latlng: { latitude: -37.8177, longitude: 144.9514 },
						title: "Southern Cross Station",
						description: {
							value: 50,
							place: "Spencer St, Docklands VIC 3008",
							level: "LOW",
						},
						tintColor: "red",
					},
					{
						latlng: { latitude: -37.8181, longitude: 144.9668 },
						title: "Flinders Street Station",
						description: {
							value: 100,
							place: "Flinders St, Melbourne VIC 3000",
							level: "HIGH",
						},
						tintColor: "green",
					},
				]}
				marker_icon={require("../assets/images/anyone_around.png")}
				value_name="Pedestrian Counts"
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
