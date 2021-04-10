import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { COLORS } from "../shared/constants";

export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_options: false,
		};
	}

	showOptions() {
		if (this.state.show_options) {
			return (
				<View style={styles.buttons_view}>
					<TouchableOpacity
						style={{
							...styles.menu_button,
							left: 10,
							bottom: 100,
						}}
						onPress={() => this.props.navigation.navigate("Anyone Around?")}
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
						onPress={() => this.props.navigation.navigate("PSO Finder")}
					>
						<Image
							source={require("../assets/images/pso_finder.png")}
							style={styles.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ ...styles.menu_button, right: 10, bottom: 100 }}
						onPress={() => this.props.navigation.navigate("Emergency Call")}
					>
						<Image
							source={require("../assets/images/emergency.png")}
							style={styles.icon}
						/>
					</TouchableOpacity>
				</View>
			);
		} else {
			return <></>;
		}
	}

	render() {
		return (
			<View style={styles.menu}>
				<TouchableOpacity
					onPress={() =>
						this.setState({
							show_options: !this.state.show_options,
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
		height: "75%",
		justifyContent: "center",
		alignItems: "center",
	},
});
