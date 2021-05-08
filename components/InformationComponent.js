import React from "react";
import {
	View,
	ScrollView,
	Image,
	StyleSheet,
	Text,
	FlatList,
	Linking,
} from "react-native";
import { Card } from "react-native-elements";
import { COLORS, EMERGENCY_NUMBER, IMAGES } from "../shared/constants";

const renderIcon = ({ item }) => (
	<View style={styles.legendCardItem}>
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
		<Text style={styles.cardText}>{item.text}</Text>
	</View>
);

const renderCard = ({ item }) => (
	<Card containerStyle={styles.card}>
		<Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
		<Card.Divider />
		{item.text && <Text style={styles.cardText}>{item.text}</Text>}
		{item.icons && (
			<FlatList
				nestedScrollEnabled
				data={item.icons}
				style={styles.cardList}
				renderItem={renderIcon}
				keyExtractor={(item) => item.id}
			/>
		)}
		{item.content && item.content}
	</Card>
);

const Information = ({ page }) => {
	const info = {
		"Anyone Around?": [
			{
				id: "1",
				title: "What is Anyone Around?",
				text:
					"'Anyone Around?' is a tool that uses pedestrian counts from sensors placed all over the City of Melbourne to lead you to a safer and crowded street.",
			},
			{
				id: "2",
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
			{
				id: "3",
				title: "FAQS",
				content: (
					<>
						<Text style={[styles.cardText, styles.tip]}>
							1. Are you in immediate danger?
						</Text>
						<Text
							style={[styles.cardText, styles.link, { color: "red" }]}
							onPress={() => Linking.openURL(`tel:${EMERGENCY_NUMBER}`)}
						>
							Click here to Call 000!
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							2. When do I use Anyone Around?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							a. When in low danger scenarios like feeling unsafe in a secluded
							street.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							b. When you want to know the pedestrian traffic at a destination
							in the city when you are planning a journey into the city.
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							3. What is displayed on the Pop-ups?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							a. Name, of the street in which a pedestrian counter is present.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							b. Count, of the average number of pedestrians who have crossed
							this street in the previous hour.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							c. Pedestrian Traffic Level, in comparison to the other places
							around the city.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							d. Walking distance, from your specified/current location to the
							street on which the pedestrian counter is present.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							e. Walking duration, from your specified/current location to the
							street on which the pedestrian counter is present.
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							4. How are the recommendations being made?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							Recommendations are made based on the distance from your location
							and pedestrian traffic
						</Text>
					</>
				),
			},
		],
		"PSO Finder": [
			{
				id: "1",
				title: "What is PSO Finder?",
				text:
					"'PSO Finder' is a tool that uses openly available police stations and PTV train stations data to lead you to Protective Service Officers (PSO) around the city.",
			},
			{
				id: "2",
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
						imageBackgroundStyle: { backgroundColor: COLORS.highlight },
					},
				],
			},
			{
				id: "3",
				title: "FAQS",
				content: (
					<>
						<Text style={[styles.cardText, styles.tip]}>
							1. Are you in immediate danger?
						</Text>
						<Text
							style={[styles.cardText, styles.link, { color: "red" }]}
							onPress={() => Linking.openURL(`tel:${EMERGENCY_NUMBER}`)}
						>
							Click here to Call 000!
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							2. How does a PSO look like?
						</Text>
						<Image
							source={require("../assets/images/pso.jpg")}
							style={{ width: 300, height: 300 }}
						/>
						<Text
							style={[
								styles.cardText,
								{ marginVertical: 5, textAlign: "center" },
							]}
						>
							Sourced from www.ptv.vic.gov.au
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							3. No Protective Service Officer?
						</Text>
						<Text
							style={[styles.cardText, styles.link]}
							onPress={() =>
								Linking.openURL(
									"https://www.ptv.vic.gov.au/more/travelling-on-the-network/travelling-safely/safety-you-can-see/"
								)
							}
						>
							Safety near Train Stations
						</Text>
						<Text
							style={[styles.cardText, styles.link]}
							onPress={() =>
								Linking.openURL(
									"https://www.ptv.vic.gov.au/more/travelling-on-the-network/travelling-safely/safety-you-can-see/"
								)
							}
						>
							Safety near Police Stations
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							4. How are the recommendations being made?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							Recommendations are made based on the distance from your location
							and the probability of finding a Protective Service Officer at
							that location.
						</Text>
					</>
				),
			},
		],
		Home: [
			{
				id: "1",
				title: "What is Home?",
				text:
					"Home is landing page of the app. It shows the map, feature menu and emergency menu. You can provide your location here through the search bar or current location to the right of the search bar.",
			},
			{
				id: "2",
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
			{
				id: "3",
				title: "FAQS",
				content: (
					<>
						<Text style={[styles.cardText, styles.tip]}>
							1. Are you in immediate danger?
						</Text>
						<Text
							style={[styles.cardText, styles.link, { color: "red" }]}
							onPress={() => Linking.openURL(`tel:${EMERGENCY_NUMBER}`)}
						>
							Click here to Call 000!
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							2. How to enter your location?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							There are 2 ways to enter your location. Either you can search a
							location in CBD from the search bar, or click on the location
							button beside the search bar to access your current location. It's
							your choice! Owl Lead doesn't store your location nor does it need
							you to constantly provide it.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							You can enter your location at any page with a map in it. We
							recommend you provide it on the home page itself, cause you never
							know when you will need it.
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							3. When can you save your emergency contacts for SOS alert?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							Anytime! But we recommend to add your emergency contacts
							immediately on your first installing Owl Lead. This ensures that
							the SOS alert is operational immediately.
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							4. Not the service you want?
						</Text>
						<Text
							style={[styles.cardText, styles.link]}
							onPress={() =>
								Linking.openURL(
									"https://www.police.vic.gov.au/emergency-response#emergency-services"
								)
							}
						>
							Victorian Emergency Services
						</Text>
						<Text
							style={[styles.cardText, styles.link]}
							onPress={() =>
								Linking.openURL(
									"https://www.melbourne.vic.gov.au/community/safety-emergency/emergency-management/Pages/Melbourne-CBD-Safety-Plan.aspx"
								)
							}
						>
							Safety Plan for City of Melbourne
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							4. How can you give us feedback?
						</Text>
						<Text
							style={[styles.cardText, styles.link]}
							onPress={() =>
								Linking.openURL(
									"mailto:owllead@gmail.com?subject=Feedback&body=Hi Owl Lead Team,"
								)
							}
						>
							owllead@gmail.com
						</Text>
						<Text
							style={[styles.cardText, styles.link]}
							onPress={() => Linking.openURL("https://www.owllead.live")}
						>
							www.owllead.live
						</Text>
					</>
				),
			},
		],
		"Emergency Contacts": [
			{
				id: "1",
				title: "What is Emergency Contacts?",
				text:
					"Emergency Contacts is a tool to add contacts from your phone as emergency contacts. An emergency SMS will be drafted on your phone to these contacts on clicking the 'SOS' button.",
			},
			{
				id: "2",
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
			{
				id: "3",
				title: "FAQS",
				content: (
					<>
						<Text style={[styles.cardText, styles.tip]}>
							1. Are you in immediate danger?
						</Text>
						<Text
							style={[styles.cardText, styles.link, { color: "red" }]}
							onPress={() => Linking.openURL(`tel:${EMERGENCY_NUMBER}`)}
						>
							Click here to Call 000!
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							2. When can you save your emergency contacts for SOS alert?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							Anytime! But we recommend to add your emergency contacts
							immediately on your first installing Owl Lead. This ensures that
							the SOS alert is operational immediately.
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							Your emergency contact details are stored on your phone storage
							and no one except you has access to them through Owl Lead. We
							respect your privacy!
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							3. What are the qualitites of a good emergency contact?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							a. Knows you really well
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							b. Is available
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							c. Knows your medical history
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							d. Can donate blood to you
						</Text>
						<Text style={[styles.cardText, styles.tip]}>
							4. What are some things I need to update my emergency contacts on?
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							a. Medications
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>b. Allergies</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							c. Chronic Conditions
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							d. Surgical History
						</Text>
						<Text style={[styles.cardText, styles.tipText]}>
							e. Family Contact Information
						</Text>
					</>
				),
			},
		],
	};

	return (
		<FlatList
			nestedScrollEnabled
			style={styles.container}
			persistentScrollbar={true}
			data={info[page]}
			renderItem={renderCard}
			keyExtractor={(item) => item.id}
		/>
	);
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
	cardText: {
		textAlign: "justify",
		color: COLORS.dark,
		fontSize: 17,
	},
	cardList: {
		flexGrow: 0,
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
	legendCardImageButtons: {
		backgroundColor: COLORS.light,
		borderColor: COLORS.dark,
		borderWidth: 1,
	},
	cardContent: {
		alignSelf: "stretch",
	},
	link: {
		fontWeight: "bold",
		textDecorationLine: "underline",
		marginVertical: 5,
		marginLeft: 15,
		textAlign: "justify",
		color: "blue",
	},
	tip: { fontWeight: "bold", marginBottom: 5 },
	tipText: { marginHorizontal: 15, marginVertical: 5 },
});

export default Information;
