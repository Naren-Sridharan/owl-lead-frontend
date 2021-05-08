import React from "react";
import { View, ScrollView, Image, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import { COLORS, IMAGES } from "../shared/constants";

const renderItem = (item) => (
	<View key={item.id} style={styles.legendCardItem}>
		<View
			style={[
				styles.legendCardImageBackground,
				item.imageBackgroundStyle
					? item.imageBackgroundStyle
					: styles.legendCardImageButtons,
			]}
		>
			<Image
				source={item.source}
				style={[styles.legendCardImage, item.imageStyle]}
			/>
		</View>
		<Text style={styles.legendCardText}>{item.text}</Text>
	</View>
);

const Information = ({ page }) => (
	<ScrollView
		style={styles.container}
		persistentScrollbar={true}
		indicatorStyle={"white"}
	>
		<Card containerStyle={styles.card}>
			<Card.Title style={styles.cardTitle}>{info[page].what.title}</Card.Title>
			<Card.Divider />
			<Text style={styles.whatCardText}>{info[page].what.text}</Text>
		</Card>
		{info[page].legend && (
			<Card containerStyle={styles.card}>
				<Card.Title style={styles.cardTitle}>
					{info[page].legend.title}
				</Card.Title>
				<Card.Divider />
				<View>{info[page].legend.icons.map(renderItem)}</View>
			</Card>
		)}
	</ScrollView>
);

let info = {
	"Anyone Around?": {
		what: {
			title: "What is Anyone Around?",
			text:
				"'Anyone Around?' is a tool that uses pedestrian counts from sensors placed all over the City of Melbourne to lead you to a safer and crowded street.",
		},
		legend: {
			title: "What am I seeing?",
			icons: [
				{
					id: "1",
					text: "Your Searched/Current Location",
					source: IMAGES.location,
					imageStyle: { tintColor: COLORS.levels.LOW },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "2",
					text: "Low Pedestrian Traffic",
					source: IMAGES.anyone_around,
					imageStyle: { tintColor: COLORS.levels.LOW },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "3",
					text: "Moderate Pedestrian Traffic",
					source: IMAGES.anyone_around,
					imageStyle: { tintColor: COLORS.levels.MODERATE },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "4",
					text: "High Pedestrian Traffic",
					source: IMAGES.anyone_around,
					imageStyle: { tintColor: COLORS.levels.HIGH },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "5",
					text: "Recommendation for Safety",
					source: IMAGES.anyone_around,
					imageStyle: { tintColor: COLORS.light },
					imageBackgroundStyle: { backgroundColor: COLORS.highlight },
				},
			],
		},
	},
	"PSO Finder": {
		what: {
			title: "What is PSO Finder?",
			text:
				"'PSO Finder' is a tool that uses openly available police stations and PTV train stations data to lead you to Protective Service Officers (PSO) around the city.",
		},
		legend: {
			title: "What am I seeing?",
			icons: [
				{
					id: "1",
					text: "Your Searched/Current Location",
					source: IMAGES.location,
					imageStyle: { tintColor: COLORS.light },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "2",
					text: "Low PSO Probability",
					source: IMAGES.pso_finder,
					imageStyle: { tintColor: COLORS.levels.LOW },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "3",
					text: "Moderate PSO Probability",
					source: IMAGES.pso_finder,
					imageStyle: { tintColor: COLORS.levels.MODERATE },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "4",
					text: "High PSO Probability",
					source: IMAGES.pso_finder,
					imageStyle: { tintColor: COLORS.levels.HIGH },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "5",
					text: "Recommendation for Safety",
					source: IMAGES.pso_finder,
					imageStyle: { tintColor: COLORS.light },
					imageBacgroundStyle: { backgroundColor: COLORS.highlight },
				},
			],
		},
	},
	Home: {
		what: {
			title: "What is Home?",
			text:
				"Home is landing page of the app. It shows the map, feature menu and emergency menu. You can provide your location here through the search bar or current location to the right of the search bar.",
		},
		legend: {
			title: "what am I seeing?",
			icons: [
				{
					id: "1",
					text: "Your Searched/Current Location",
					source: IMAGES.location,
					imageStyle: { tintColor: COLORS.light },
					imageBackgroundStyle: { backgroundColor: COLORS.dark },
				},
				{
					id: "2",
					text: "Menu Button",
					source: IMAGES.owl_lead,
					imageStyle: {},
				},
				{
					id: "3",
					text: "Emergency Menu",
					source: IMAGES.emergency,
					imageStyle: {},
				},
			],
		},
	},
	"Emergency Contacts": {
		what: {
			title: "What is Emergency Contacts?",
			text:
				"Emergency Contacts is a tool to add contacts from your phone as emergency contacts. An emergency SMS will be drafted on your phone to these contacts on clicking the 'SOS' button.",
		},
		legend: {
			title: "What am I seeing?",
			icons: [
				{
					id: "1",
					text: "Add Emergency Contact",
					source: IMAGES.add_contact,
					imageStyle: {},
					imageBackgroundStyle: {},
				},
				{
					id: "2",
					text: "Delete Emergency Contact",
					source: IMAGES.delete_contact,
					imageStyle: { tintColor: "red" },
					imageBackgroundStyle: {
						backgroundColor: COLORS.levels.MODERATE,
						borderWidth: 1,
						borderRadius: 5,
						borderColor: COLORS.levels.MODERATE,
					},
				},
			],
		},
	},
};

const styles = StyleSheet.create({
	container: {
		marginTop: "25%",
	},
	card: {
		backgroundColor: COLORS.light,
		alignSelf: "stretch",
	},
	cardTitle: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "bold",
		color: COLORS.dark,
	},
	whatCardText: {
		textAlign: "justify",
		color: COLORS.dark,
		fontSize: 17,
	},
	legendCardItem: {
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		borderBottomWidth: 2,
		borderColor: COLORS.dark,
		borderRadius: 10,
	},
	legendCardImageBackground: {
		left: "2%",
		marginRight: "2%",
		height: 40,
		width: 40,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	legendCardImage: {
		height: 25,
		width: 25,
	},
	legendCardText: {
		textAlign: "justify",
		color: COLORS.dark,
		fontSize: 17,
		fontWeight: "bold",
	},
	legendCardImageButtons: {
		backgroundColor: COLORS.light,
		borderColor: COLORS.dark,
		borderWidth: 1,
	},
});

export default Information;
