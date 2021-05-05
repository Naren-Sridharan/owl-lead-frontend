// Importing required modules
import React from "react";

import { StyleSheet, View, Text, Image } from "react-native";
import { Card } from "react-native-elements";

import AppIntroSlider from "react-native-app-intro-slider";
import { useDispatch } from "react-redux";
import { Actions } from "../redux/actions";

import { COLORS } from "../shared/constants";

import owl_lead from "../assets/images/owl_lead.png";
import anyone_around from "../assets/images/anyone_around.png";
import pso_finder from "../assets/images/pso_finder.png";
import emergency_call from "../assets/images/emergency_call.png";
import sos from "../assets/images/sos.png";

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
const RenderItem = ({ item }) => (
	<View style={styles.content}>
		<View style={styles.item}>
			<Text style={styles.title}>{item.title}</Text>
			<View style={styles.image_background}>
				<Image style={[styles.image, item.imageStyle]} source={item.image} />
			</View>
			<Text style={item.subcontent ? styles.subtitle : styles.text}>
				{item.text}
			</Text>
		</View>
		{item.subcontent && (
			<View style={styles.subcontent}>
				{item.subcontent.map((subitem, index) => (
					<View style={[styles.subitem, subitem.containerStyle]} key={index}>
						<View style={styles.subimage_background}>
							<Image
								style={[styles.subimage, subitem.imageStyle]}
								source={subitem.image}
							/>
						</View>
						<Text style={styles.subtext}>{subitem.text}</Text>
					</View>
				))}
			</View>
		)}
	</View>
);

// contents for each slide
const slides = [
	{
		key: "1",
		title: "Welcome",
		image: owl_lead,
		text:
			"Walking alone in the city?\n\nLet the owl lead you to safety with these safety features!",
		subcontent: [
			{
				image: anyone_around,
				text: "1. Anyone Around?",
				containerStyle: { top: "10%", left: 0 },
				imageStyle: { tintColor: COLORS.dark },
			},
			{
				image: pso_finder,
				text: "2. PSO Finder",
				containerStyle: { top: "10%", right: 0 },
				imageStyle: { tintColor: COLORS.dark },
			},
			{
				image: emergency_call,
				text: "3. Emergency Call",
				containerStyle: { bottom: "25%", left: 0 },
				imageStyle: {},
			},
			{
				image: sos,
				text: "4. SOS",
				containerStyle: { bottom: "25%", right: 0 },
				imageStyle: {},
			},
		],
	},
	{
		key: "2",
		title: "Anyone Around?",
		text:
			"Anyone Around helps you find a street where there are a substantial number of people to feel secure when you feel unsafe on a lonely street",
		image: anyone_around,
		imageStyle: { tintColor: COLORS.dark },
	},
	{
		key: "3",
		title: "PSO Finder",
		text:
			"PSO Finder helps you find places where there is a potential presence of Protected Service Officer, for the times you feel insecure or feel you are being followed.",
		image: pso_finder,
		imageStyle: { tintColor: COLORS.dark },
	},
	{
		key: "4",
		title: "Emergency Call",
		text:
			"This feature allow you to call 000 with a click of a button and shows your location",
		image: emergency_call,
		imageStyle: {},
	},
	{
		key: "5",
		title: "SOS",
		text:
			"This feature allows you send an SOS message to your emergency contacts",
		image: sos,
		imageStyle: {},
	},
];

// defining the stylesheet for slider
const styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.dark,
		padding: 20,
	},
	item: {
		flex: 1,
		padding: 10,
	},
	title: {
		top: 10,
		fontWeight: "bold",
		fontSize: 36,
		color: COLORS.light,
		textAlign: "center",
		textAlignVertical: "center",
	},
	text: {
		fontWeight: "bold",
		fontSize: 26,
		color: COLORS.light,
		textAlign: "justify",
		padding: 20,
		bottom: 10,
	},
	image_background: {
		width: 150,
		height: 150,
		borderRadius: 150,
		margin: 20,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		borderColor: COLORS.light,
		borderWidth: 2,
		borderColor: "white",
		backgroundColor: COLORS.light,
	},
	image: {
		width: 100,
		height: 100,
	},
	subtitle: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.light,
	},
	subcontent: {
		position: "absolute",
		height: "60%",
		width: "100%",
		bottom: 0,
		padding: 20,
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "space-between",
	},
	subitem: {
		position: "absolute",
		width: "50%",
		height: "40%",
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
	},
	subtext: {
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.light,
	},
	subimage_background: {
		width: 75,
		height: 75,
		borderRadius: 75,
		margin: 10,
		backgroundColor: COLORS.light,
		justifyContent: "center",
		alignItems: "center",
	},
	subimage: {
		width: 50,
		height: 50,
	},
});

export default Intro;
