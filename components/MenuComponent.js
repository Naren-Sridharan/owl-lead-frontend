import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { COLORS } from "../shared/constants";
import { Actions } from "../redux/actions";

class Menu extends Component {
	render() {
		const Options = (
			<View style={styles.buttons_view}>
				<TouchableOpacity
					style={{
						...styles.menu_button,
						left: 10,
						bottom: 100,
					}}
					onPress={() => {
						this.props.hideOptions();
						this.props.navigation.navigate("Anyone Around?");
					}}
				>
					<Image
						source={require("../assets/images/anyone_around.png")}
						style={styles.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						...styles.menu_button,
						justifyContent: "center",
						alignItems: "center",
						bottom: 200,
					}}
					onPress={() => {
						this.props.hideOptions();
						this.props.navigation.navigate("PSO Finder");
					}}
				>
					<Image
						source={require("../assets/images/pso_finder.png")}
						style={styles.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.menu_button, right: 10, bottom: 100 }}
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
			</View>
		);

		return (
			<View style={styles.menu}>
				<TouchableOpacity
					onPress={() =>
						this.props.show_options
							? this.props.hideOptions()
							: this.props.showOptions()
					}
					style={{
						...styles.menu_button,
						justifyContent: "center",
						alignItems: "center",
						bottom: 10,
					}}
				>
					<Image
						source={require("../assets/images/owl_lead.png")}
						style={styles.icon}
					/>
				</TouchableOpacity>
				{this.props.show_options ? Options : <></>}
			</View>
		);
	}
}

styles = StyleSheet.create({
	menu: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	menu_button: {
		position: "absolute",
		width: 75,
		height: 75,
		borderRadius: 75,
		zIndex: 2,
		backgroundColor: COLORS.lightPurple,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 50,
		height: 50,
		opacity: 1,
	},
	buttons_view: {
		flex: 1,
		width: "100%",
		height: 300,
		justifyContent: "center",
		alignItems: "center",
	},
});

const mapStateToProps = (state) => {
	return {
		show_options: state.show_options,
	};
};

const mapDispatchToProps = (dispatch) => ({
	showOptions: () => dispatch(Actions.showOptions()),
	hideOptions: () => dispatch(Actions.hideOptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
