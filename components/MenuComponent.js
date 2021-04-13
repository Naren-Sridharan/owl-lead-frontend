import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../shared/constants";
import { Actions } from "../redux/actions";

class Menu extends Component {
	render() {
		const Options = (
			<>
				<TouchableOpacity
					style={{
						...styles.menu_button,
						bottom: "25%",
					}}
					onPress={() => {
						this.props.hideOptions();
						this.props.navigation.navigate("Anyone Around?");
					}}
				>
					<Image
						source={require("../assets/images/anyone_around.png")}
						style={{ ...styles.icon, tintColor: COLORS.dark }}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						...styles.menu_button,
						bottom: "45%",
					}}
					onPress={() => {
						this.props.hideOptions();
						this.props.navigation.navigate("PSO Finder");
					}}
				>
					<Image
						source={require("../assets/images/pso_finder.png")}
						style={{ ...styles.icon, tintColor: COLORS.dark }}
					/>
				</TouchableOpacity>
			</>
		);

		return (
			<>
				<TouchableOpacity
					onPress={() =>
						this.props.show_options
							? this.props.hideOptions()
							: this.props.showOptions()
					}
					style={{
						...styles.menu_button,
						bottom: "3%",
					}}
				>
					<Image
						source={require("../assets/images/owl_lead.png")}
						style={styles.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.menu_button, bottom: "70%" }}
					onPress={() => {
						this.props.hideOptions();
						this.props.navigation.navigate("Emergency Call");
					}}
				>
					<Image
						source={require("../assets/images/emergency.png")}
						style={styles.icon}
					/>
				</TouchableOpacity>
				{this.props.show_options ? Options : <></>}
			</>
		);
	}
}

styles = StyleSheet.create({
	menu_button: {
		position: "absolute",
		width: 75,
		height: 75,
		right: "3%",
		borderRadius: 75,
		zIndex: 2,
		backgroundColor: COLORS.light,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 50,
		height: 50,
		opacity: 1,
	},
});

const mapStateToProps = (state) => {
	return {
		show_options: state.show_options,
		address: state.address,
	};
};

const mapDispatchToProps = (dispatch) => ({
	showOptions: () => dispatch(Actions.showOptions()),
	hideOptions: () => dispatch(Actions.hideOptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
