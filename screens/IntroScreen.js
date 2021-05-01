// Importing required modules
import React from "react";

import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
import { useDispatch } from "react-redux";
import { Actions } from "../redux/actions";

import { COLORS } from "../shared/constants";

// getting required images
const owl_lead_logo = require("../assets/images/owl_lead.png");
const anyone_around = require("../assets/images/anyone_around.png");
const pso_finder = require("../assets/images/pso_finder.png");
const emergency_000 = require("../assets/images/emergency.png");

// getting dimesions of device for spacing arrangements
const dims = Dimensions.get("window");

// main component
const Intro = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const onFinish = () => {
		dispatch(Actions.introShown());
		navigation.navigate("Home");
	};

	return (
		<AppIntroSlider
			data={slides}
			renderItem={RenderItem}
			onDone={onFinish}
			showSkipButton={true}
			onSkip={onFinish}
		/>
	);
};
// rendering function to show screens
const RenderItem = ({ item }) => {
	if (item.key == "s1") {
		return (
			<>
				<View
					style={{
						flex: 5,
						backgroundColor: item.backgroundColor,
						alignItems: "center",
						justifyContent: "space-around",
						paddingTop: 50,
					}}
				>
					<Text style={styles.introTitleStyle}>{item.title}</Text>
					<Image
						style={[styles.MainImageStyle, { backgroundColor: null }]}
						source={item.image}
					/>
					<Text style={[styles.introTextStyle, { marginBottom: 0 }]}>
						{item.text}
					</Text>
				</View>
				<View
					style={{
						flex: 3,
						flexDirection: "row",
						backgroundColor: item.backgroundColor,
						alignItems: "center",
						justifyContent: "space-around",
						paddingBottom: 10,
					}}
				>
					<Image
						style={[styles.SubImageStyle, { tintColor: "#2d327a" }]}
						source={item.image1}
					/>
					<Image style={styles.SubImageStyle} source={item.image2} />
					<Image style={styles.SubImageStyle} source={item.image3} />
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						backgroundColor: item.backgroundColor,
						alignItems: "center",
						justifyContent: "space-around",
						paddingBottom: 50,
					}}
				>
					<Text style={styles.subtextStyle}>{item.subtext1}</Text>
					<Text style={styles.subtextStyle}>{item.subtext2}</Text>
					<Text style={styles.subtextStyle}>{item.subtext3}</Text>
				</View>
			</>
		);
	} else {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: item.backgroundColor,
					alignItems: "center",
					justifyContent: "space-around",
					paddingTop: 50,
				}}
			>
				<Text style={styles.introTitleStyle}> {item.title} </Text>
				{item.key != "s2" ? (
					<Image style={styles.MainImageStyle} source={item.image} />
				) : (
					<Image
						style={[styles.MainImageStyle, { tintColor: COLORS.dark }]}
						source={item.image}
					/>
				)}

				<Text style={styles.introTextStyle}> {item.text} </Text>
			</View>
		);
	}
};

// contents for each slide
const slides = [
	{
		key: "s1",
		text: "Let the owl lead you to safety!",
		title: "Welcome",
		image: owl_lead_logo,
		image1: anyone_around,
		image2: pso_finder,
		image3: emergency_000,
		backgroundColor: "#5b38a1",
		subtext1: "Anyone Around",
		subtext2: "Pso Finder",
		subtext3: "Emergency 000",
	},
	{
		key: "s2",
		title: "Anyone Around",
		text:
			"Anyone Around helps you find a street where there are a substantial number of people to feel secure when you feel unsafe on a lonely street",
		image: anyone_around,
		backgroundColor: "#6d42c2",
	},
	{
		key: "s3",
		title: "PSO Finder",
		text:
			"PSO Finder helps you find places where there is a potential presence of Protected Service Officer, for the times you feel insecure or feel you are being followed.",
		image: pso_finder,
		backgroundColor: "#6d42c2",
	},
	{
		key: "s4",
		title: "Emergency 000",
		text:
			"This feature allow you to call 000 with a click of a button and simultaneously messages your emergency contacts your current location with a distress message ",
		image: emergency_000,
		backgroundColor: "#6d42c2",
	},
];

// defining the stylesheet for slider
const styles = StyleSheet.create({
	subtextStyle: {
		padding: 20,
		textAlign: "center",
		fontSize: 18,
		color: "white",
		marginBottom: dims.height / 4.5,
	},
	SubImageStyle: {
		width: 75,
		height: 75,
	},
	MainImageStyle: {
		width: 200,
		height: 200,
		marginTop: 20,
	},
	introTextStyle: {
		fontSize: 20,
		color: "white",
		textAlign: "center",
		paddingVertical: 20,
		paddingHorizontal: 20,
		marginBottom: 100,
	},
	introTitleStyle: {
		fontSize: 30,
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},
});
export default Intro;
