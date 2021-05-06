import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";
import Loading from "../components/LoadingComponent";

const AnyoneAround = ({ navigation, route }) => {
	const pedestrian_counts = useSelector((state) => state.pedestrian_counts);
	const isLoading = useSelector((state) => state.isLoading);
	const errMsg = useSelector((state) => state.errMsg);

	if (isLoading) {
		return <Loading />;
	} else if (errMsg) {
		return (
			<View style={styles.container}>
				<Text>{errMsg}</Text>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Map
					markers={pedestrian_counts}
					marker_icon={require("../assets/images/anyone_around.png")}
					value_name="Pedestrian Counts"
					level_name="Traffic"
				/>
				<Menu navigation={navigation} route={route} info={true} />
				<PageTitle navigation={navigation} name={route.name} />
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AnyoneAround;
