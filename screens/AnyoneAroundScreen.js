import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Map from "../components/MapComponent";
import Menu from "../components/MenuComponent";
import PageTitle from "../components/PageTitleComponent";
import Loading from "../components/LoadingComponent";
import { IMAGES } from "../shared/constants";
import { fetchPedestrianCounts } from "../shared/loaders";

const AnyoneAround = ({ navigation, route }) => {
	const pedestrian_counts = useSelector((state) => state.pedestrian_counts);
	const isLoading = useSelector((state) => state.isLoading);
	const errMsg = useSelector((state) => state.errMsg);
	const update_time = useSelector((state) => state.update_time);
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			if (!update_time || Date.now() - update_time > 10 * 60 * 1000) {
				dispatch(fetchPedestrianCounts());
			}
		}, [])
	);

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
					marker_icon={IMAGES.anyone_around}
					value_name="Past Hour Count"
					level_name="Pedestrian Traffic"
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
