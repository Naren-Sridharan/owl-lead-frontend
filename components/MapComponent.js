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
import { connect } from "react-redux";
import { Actions } from "../redux/actions";
import MapView, { Marker, Callout } from "react-native-maps";
import { isPointWithinRadius } from "geolib";
import * as Location from "expo-location";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
	API_KEY,
	COLORS,
	directions_server_address,
} from "../shared/constants";
import { fetchDistances } from "../shared/loaders";

const { width, height } = Dimensions.get("window");

// set initial location region
const INITIAL_REGION = {
	latitude: -37.8138,
	longitude: 144.9578,
	latitudeDelta: 0.02,
	longitudeDelta: 0.02 * (width / height),
};

//create a class component for any Map used in Owl Lead's Features
class Map extends Component {
	// constructor to initialize map region and state with marker details
	constructor(props) {
		super(props);
		console.log("Map Creation");
		Location.setGoogleApiKey(API_KEY);

		this._searchRef = React.createRef();
		this._mapRef = React.createRef();

		// initialize state with region, markers, user location and type of value being displayed
		this.state = {
			region: INITIAL_REGION,
			markers: !props.markers ? [] : props.markers,
			marker_icon: props.marker_icon,
			errorMsg: null,
			value_name: props.value_name,
			level_name: props.level_name,
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
		if (
			this.props.location &&
			this.state.markers.length &&
			!this.state.markers[0].distance
		) {
			this._getDistances();
		}
	}

	_getDistances = async () => {
		if (!this.state.markers.length) {
			return;
		}

		try {
			let results = await fetchDistances(
				this.props.location,
				this.state.markers.map((marker) => marker.latlng)
			);
			this.setState({
				markers: this.state.markers.map((marker, index) => ({
					...marker,
					distance: results[index].distance,
					duration: results[index].duration,
				})),
			});
		} catch (error) {
			alert("Error getting distances");
			console.log(error);
		}
	};

	// Function to get user location asynchornously
	_getLocationAsync = async () => {
		this.props.hideOptions();
		try {
			// ask for location permission
			let { status } = await Location.requestPermissionsAsync();

			// if location permission is not granted
			if (status !== "granted") {
				// if this is the first time we are asking for permission
				if (this.props.location_access == null) {
					// note that permission has been denied
					this.props.denyLocationAccess();

					// return to screen, as there is nothing to be done if location permission is denied
					return;
				}

				// if it is not the first time asking for location and it has been denied so far
				if (!this.props.location_access) {
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
				this.props.allowLocationAccess();
			}

			// get current location
			let location = await Location.getCurrentPositionAsync({});

			location = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};

			isLocationOutside = !isPointWithinRadius(
				location,
				{
					latitude: INITIAL_REGION.latitude,
					longitude: INITIAL_REGION.longitude,
				},
				3000
			);

			if (isLocationOutside) {
				this.props.denyLocationAccess();
				Alert.alert(
					"Unservicable Location",
					"Sorry! We cannot serve the location you are currently at, as it is out of the city radius that we serve."
				);
				return;
			}

			// set location globally
			this.props.setLocation(location);

			// Center the map on the location we just fetched.
			this.setState({
				region: {
					...this.state.region,
					...this.props.location,
				},
			});

			let address = (
				await Location.reverseGeocodeAsync(this.props.location, {
					useGoogleMaps: true,
				})
			)[0];

			address = `${address.name}, ${address.city}, ${address.region}, ${address.country}`;

			this.props.setAddress(address);

			this._searchRef.current?.setAddressText(address);

			this._getDistances();
		} catch (error) {
			if (this.props.location_access == null) {
				this._getLocationAsync();
			}
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
					onPress={this.props.hideOptions}
					ref={(ref) => (this._mapRef = ref)}
					minZoomLevel={15}
					onLayout={() =>
						this._mapRef.setMapBoundaries(
							{
								latitude:
									INITIAL_REGION.latitude + INITIAL_REGION.latitudeDelta / 2,
								longitude:
									INITIAL_REGION.longitude + INITIAL_REGION.longitudeDelta / 2,
							},
							{
								latitude:
									INITIAL_REGION.latitude - INITIAL_REGION.latitudeDelta / 2,
								longitude:
									INITIAL_REGION.longitude - INITIAL_REGION.longitudeDelta / 2,
							}
						)
					}
				>
					{
						// set up markers from state onto the map view
						this.state.markers.map((marker, index) => (
							<Marker
								key={index}
								coordinate={marker.latlng}
								onPress={this.props.hideOptions}
							>
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
											`${directions_server_address}` +
												(!this.props.location
													? ""
													: `&origin=${this.props.location.latitude},${this.props.location.longitude}`) +
												`&destination=${marker.latlng.latitude},${marker.latlng.longitude}`
										)
									}
								>
									<View>
										<Text>{marker.place}</Text>
										{this.state.value_name ? (
											<Text>
												{this.state.value_name}: {marker.value}
											</Text>
										) : (
											<></>
										)}
										<Text>
											{this.state.level_name}: {marker.level}
										</Text>
										{marker.distance ? (
											<Text>Distance: {marker.distance} meters</Text>
										) : (
											<Text></Text>
										)}
										{marker.duration ? (
											<Text>Duration: {marker.duration} minutes</Text>
										) : (
											<Text></Text>
										)}
										<Button
											title="Directions"
											color={COLORS.dark}
											accessibilityLabel="This button redirects you to google maps for directions to the location"
										/>
									</View>
								</Callout>
							</Marker>
						))
					}
					{this.props.location ? (
						<Marker
							coordinate={this.props.location}
							onPress={this.props.hideOptions}
						>
							<Image
								source={require("../assets/images/location.png")}
								style={{
									...styles.marker,
									tintColor: COLORS.light,
									backgroundColor: COLORS.dark,
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
					ref={this._searchRef} // Reference to be used to access input
					textInputProps={{
						onLayout: () =>
							this.props.address
								? this._searchRef.current?.setAddressText(this.props.address)
								: "",
						onFocus: this.props.hideOptions,
					}}
					placeholder="Search" // Show 'Search' in location search bar
					minLength={2} // Show autocomplete after 2 letters
					autoFocus={false} // Don't focus on searchbar when page loads
					returnKeyType={"search"} // return search results
					fetchDetails={true} // fetch geometry details
					renderDescription={(row) => row.description} // show place name in each row of list
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
						// On selecting suggestion, Set location to that suggestion
						this.props.setLocation({
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
						});

						// update address on search bar to current location
						this.props.setAddress(data.description);

						// update distances
						this._getDistances();
					}}
					query={{
						// for querying
						key: API_KEY, // use api key
						language: "en", // language english
						components: "country:au", // results only for australia
						location: `${INITIAL_REGION.latitude}, ${INITIAL_REGION.longitude}`,
						radius: "3000", // 3km
						strictbounds: true,
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
		height: 20,
		width: 20,
	},
	callout: {
		flex: -1,
		position: "absolute",
		width: 250,
	},
	button: {
		backgroundColor: COLORS.dark,
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
		tintColor: COLORS.light,
	},
});

const mapStateToProps = (state) => {
	return {
		location: state.location,
		location_access: state.location_access,
		address: state.address,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setAddress: (address) => dispatch(Actions.setAddress(address)),
	setLocation: (location) => dispatch(Actions.setLocation(location)),
	allowLocationAccess: () => dispatch(Actions.allowLocationAccess()),
	denyLocationAccess: () => dispatch(Actions.denyLocationAccess()),
	hideOptions: () => dispatch(Actions.hideOptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
