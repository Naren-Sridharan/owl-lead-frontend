import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";

export default AnyoneAround = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Map
				markers={[
					{
						latlng: { latitude: -37.8177, longitude: 144.9514 },
						title: "Southern Cross Station",
						value: 50,
						place: "Spencer St, Docklands VIC 3008",
						level: "LOW",
						tintColor: "red",
						distance: null,
						duration: null,
					},
					{
						latlng: { latitude: -37.8181, longitude: 144.9668 },
						value: 100,
						place: "Flinders St, Melbourne VIC 3000",
						level: "HIGH",
						tintColor: "green",
						distance: null,
						duration: null,
					},
				]}
				marker_icon={require("../assets/images/anyone_around.png")}
				value_name="Pedestrian Counts"
				level_name="Traffic"
			/>
			<Menu navigation={navigation} />
			<PageTitle text="Anyone Around?" />
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
