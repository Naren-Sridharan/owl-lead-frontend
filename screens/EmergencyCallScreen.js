import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../shared/constants";

function EmergencyCall(props) {
	return (
		<View style={styles.container}>
			{props.address.split(",").map((address_line) => (
				<Text style={styles.text}>{address_line}</Text>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.purple,
	},
	text: {
		fontWeight: "bold",
		fontSize: 42,
		color: COLORS.orange,
	},
});

const mapStateToProps = (state) => {
	return {
		location: state.location,
		location_access: state.location_access,
		address: state.address,
	};
};

export default connect(mapStateToProps, null)(EmergencyCall);
