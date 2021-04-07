import React, { Component } from "react";
import {
	StyleSheet,
	Image,
	Dimensions,
	Button,
	Text,
	View,
	Linking,
	TouchableOpacity,
} from "react-native";

export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options_clicked: false,
		};
	}

	showOptions() {
		if (this.state.options_clicked) {
			return (
				<View style={styles.buttons_view}>
					<TouchableOpacity
						style={{ ...styles.menu_button, left: 10, bottom: 100 }}
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
							top: 0,
						}}
					>
						<Image
							source={require("../assets/images/pso_finder.png")}
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ ...styles.menu_button, right: 10, bottom: 100 }}
					>
						<Image
							source={require("../assets/images/emergency.png")}
							style={styles.icon}
						/>
					</TouchableOpacity>
				</View>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<View style={styles.menu}>
				<TouchableOpacity
					onPress={() =>
						this.setState({
							options_clicked: !this.state.options_clicked,
						})
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
				{this.showOptions()}
			</View>
		);
	}
}

styles = StyleSheet.create({
	menu: {
		position: "absolute",
		width: "100%",
		height: "30%",
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	menu_button: {
		position: "absolute",
		width: 75,
		height: 75,
		borderRadius: 75,
		zIndex: 2,
		backgroundColor: "rgba(132,21,132,0.9)",
		opacity: 0.75,
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
		height: "75%",
		justifyContent: "center",
		alignItems: "center",
	},
	cone: {
		width: 0,
		height: 0,
		borderLeftWidth: 110,
		borderLeftColor: "transparent",
		borderRightWidth: 110,
		borderRightColor: "transparent",
		borderTopWidth: 200,
		borderTopColor: "#841584",
		borderRadius: 110,
		zIndex: 1,
	},
});
