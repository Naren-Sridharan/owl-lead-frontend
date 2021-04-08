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
	Platform,
	Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { getDistance } from "geolib";
import * as Location from "expo-location";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

//Get the dimensions of the viewport
const { width, height } = Dimensions.get("window");
// set initial location region
const INITIAL_REGION = {
	latitude: -37.8186,
	longitude: 144.9637,
	latitudeDelta: 0.08,
	longitudeDelta: 0.08 * (width / height),
};

const API_KEY = "AIzaSyCy_gaMIh9ugIJqylorjU0cJkqtlayk1qA";

//create a class component for any Map used in Owl Lead's Features
export default class Map extends Component {
	// constructor to initialize map region and state with marker details
	constructor(props) {
		super(props);

		this.ref = React.createRef();

		// initialize state with region, markers, user location and type of value being displayed
		this.state = {
			region: INITIAL_REGION,
			markers: props.markers,
			marker_icon: props.marker_icon,
			location: null,
			location_access: null,
			errorMsg: null,
			value_name: props.value_name,
		};
	}

	openSetting = () => {
		if (Platform.OS == "ios") {
			Linking.openURL("app-settings:");
		} else {
			IntentLauncherAndroid.startActivityAsync(
				IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
			);
		}
	};

	componentDidMount() {
		this._getLocationAsync();
	}

	// Function to get user location asynchornously
	_getLocationAsync = async () => {
		try {
			// ask for location permission
			let { status } = await Location.requestPermissionsAsync();

			// if location permission is not granted
			if (status !== "granted") {
				// if this is the first time we are asking for permission
				if (this.state.location_access == null) {
					// note that permission has been denied
					this.setState({ location_access: false });

					// return to screen, as there is nothing to be done if location permission is denied
					return;
				}

				// if it is not the first time asking for location and it has been denied so far
				if (!this.state.location_access) {
					// Show an alert asking whether user want's to change location access in app settings
					Alert.alert(
						"No Permission for Location Access",
						"Permission to access location was denied, personalized features will be disabled unless location access is reactivated in settings. Do you wish to change settings?",
						[
							{
								text: "Yes",
								onPress: () => {
									this.openSetting();
								},
							},
							{
								text: "No",
								onPress: () => console.log("Cancel Pressed"),
								style: "cancel",
							},
						]
					);
					return;
				}
			} else {
				this.setState({ location_access: true });
			}

			// get current location
			let location = await Location.getCurrentPositionAsync({});

			// update address on search bar to current location
			this.ref.current?.setAddressText("Current Location");

			// Center the map on the location we just fetched.
			this.setState({
				location: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				},
				region: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: INITIAL_REGION.latitudeDelta,
					longitudeDelta: INITIAL_REGION.longitudeDelta,
				},
			});
		} catch (error) {
			alert(this.state.errorMsg);
		}
	};

	// set new region
	onRegionChange = (region) => {
		this.setState({ region });
	};

	// render map view
	render() {
		return (
			<>
				{/* create a map view component with region focusing on melbourne*/}
				<MapView
					style={styles.map}
					provider={MapView.PROVIDER_GOOGLE}
					initialRegion={INITIAL_REGION}
					onRegionChange={this.onRegionChange}
				>
					{
						// set up markers from state onto the map view
						this.state.markers.map((marker, index) => (
							<Marker key={index} coordinate={marker.latlng}>
								<View>
									{/*Make markers have a customized image with color*/}
									<Image
										source={this.state.marker_icon}
										style={{ ...styles.marker, tintColor: marker.tintColor }}
									/>
								</View>
								{/*Create a popup with details for marker and with redirection button to google maps for directions*/}
								<Callout
									style={styles.callout}
									onPress={() =>
										Linking.openURL(
											`https://www.google.com/maps/dir/?api=1` +
												(!this.state.location
													? ""
													: `&origin=${this.state.location.latitude},${this.state.location.longitude}`) +
												`&destination=${marker.latlng.latitude},${marker.latlng.longitude}`
										)
									}
								>
									<View>
										<Text>{marker.title}</Text>
										<Text>Place: {marker.description.place}</Text>
										<Text>
											{this.state.value_name}: {marker.description.value}
										</Text>
										<Text>Level: {marker.description.level}</Text>
										{this.state.location ? (
											<Text>
												Distance:{" "}
												{getDistance(this.state.location, marker.latlng) /
													1000 +
													" Km"}{" "}
											</Text>
										) : (
											<Text></Text>
										)}
										<Button
											title="Directions"
											color="#841584"
											accessibilityLabel="This button redirects you to google maps for directions to the location"
										/>
									</View>
								</Callout>
							</Marker>
						))
					}
					{this.state.location ? (
						<Marker coordinate={this.state.location}>
							<Image
								source={require("../assets/images/location.png")}
								style={{
									...styles.marker,
									tintColor: "orange",
									backgroundColor: "#841584",
									borderRadius: 20,
								}}
							/>
						</Marker>
					) : (
						<></>
					)}
				</MapView>
				{/* Show search bar for places autocomplete */}
				<GooglePlacesAutocomplete
					ref={this.ref} // Reference to be used to access input
					placeholder="Search" // Show 'Search' in location search bar
					minLength={2} // Show autocomplete after 2 letters
					autoFocus={false} // Don't focus on searchbar when page loads
					returnKeyType={"search"} // return search results
					fetchDetails={true} // fetch geometry details
					renderDescription={(row) => row.description} // show place name in each row of list
					getDefaultValue={() => ""} // default value is empty
					styles={{
						// set styles
						textInputContainer: { width: "100%" },
						description: { fontWeight: "bold" },
						container: {
							position: "absolute",
							background: "transparent",
							width: "100%",
							height: "100%",
							top: 30,
							left: 10,
							right: 10,
						},
						listView: { width: "95%" },
					}}
					onPress={(data, details = null) => {
						// On selecting suggestion
						this.setState({
							// Set location to that suggestion
							location: {
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng,
							},
						});
					}}
					query={{
						// for querying
						key: API_KEY, // use api key
						language: "en", // language english
						components: "country:au", // results only for australia
					}}
					// sort places by distance
					GooglePlacesSearchQuery={{ rankby: "distance" }}
					// when fetching details return geometric coordinates
					GooglePlacesDetailsQuery={{ fields: "geometry" }}
					// don't show powered by google row in list
					enablePoweredByContainer={false}
					debounce={200}
					// show a button for user to request using their current location instead
					renderRightButton={() => (
						<TouchableOpacity
							onPress={this._getLocationAsync}
							style={styles.button}
							accessibilityLabel="This button tries to access your current location"
						>
							<Image
								source={require("../assets/images/location.png")}
								style={styles.icon}
							/>
						</TouchableOpacity>
					)}
				/>
			</>
		);
	}
}

// create all general styles for each component in one constant stylesheet
const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	},
	marker: {
		height: 15,
		width: 15,
	},
	callout: {
		flex: -1,
		position: "absolute",
		width: 250,
	},
	button: {
		backgroundColor: "#841584",
		width: 40,
		height: 45,
		right: 20,
		borderRadius: 4,
		padding: 2,
		marginBottom: 4,
	},
	icon: {
		width: 30,
		height: 30,
		top: 5,
		left: 3,
		alignContent: "center",
		tintColor: "orange",
	},
});
