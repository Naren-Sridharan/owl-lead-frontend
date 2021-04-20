import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";
import Loading from "../components/LoadingComponent";

export default AnyoneAround = ({ navigation, route }) => {
	const pedestrian_counts = useSelector((state) => state.pedestrian_counts);
	const isLoading = useSelector((state) => state.isLoading);
	const errMsg = useSelector((state) => state.errMsg);

	if (isLoading) {
		return <Loading />;
	} else if (errMsg) {
		return (
			<View style={styles.container}>
				<Text>{errMess}</Text>
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
				<Menu navigation={navigation} route={route} />
				<PageTitle navigation={navigation} route={route} />
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
