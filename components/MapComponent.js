import React, { useRef, useState, useEffect, memo } from "react";
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
import { useSelector, useDispatch } from "react-redux";
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
	latitudeDelta: 0.03,
	longitudeDelta: 0.03 * (width / height),
};

const openSetting = () => {
	Platform.OS == "ios"
		? Linking.openURL("app-settings:")
		: IntentLauncherAndroid.startActivityAsync(
				IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
		  );
};

//create a class component for any Map used in Owl Lead's Features
const Map = (props) => {
	// get properties used from redux store
	const location = useSelector((state) => state.location);
	const location_access = useSelector((state) => state.location_access);
	const address = useSelector((state) => state.address);

	// initialize state with region, markers, user location and type of value being displayed
	const [region, setRegion] = useState(INITIAL_REGION);
	const [markers, setMarkers] = useState(!props.markers ? [] : props.markers);
	const [best, setBest] = useState(null);

	// redux actions
	const dispatch = useDispatch();
	const setAddress = (address) => dispatch(Actions.setAddress(address));
	const setLocation = (location) => dispatch(Actions.setLocation(location));
	const allowLocationAccess = () => dispatch(Actions.allowLocationAccess());
	const denyLocationAccess = () => dispatch(Actions.denyLocationAccess());
	const hideOptions = () => dispatch(Actions.hideOptions());

	// references to search bar and mapview components
	let searchRef = useRef(null);
	let mapRef = useRef(null);

	Location.setGoogleApiKey(API_KEY);

	useEffect(() => {
		const findBest = async () => {
			const levelValue = { LOW: -1, MODERATE: 0, HIGH: 1 };

			const closest = markers.reduce(
				(iMin, x, i, arr) => (x.distance < arr[iMin].distance ? i : iMin),
				0
			);

			let betters = markers.filter(
				(x) =>
					x.duration <= 25 &&
					x.id !== markers[closest].id &&
					(levelValue[x.level] > levelValue[markers[closest].level] ||
						(levelValue[x.level] == 1 && x.value > markers[closest].value))
			);

			let local_best =
				betters.length > 0
					? betters[
							betters.reduce(
								(iSafe, x, i, arr) =>
									x.level >= arr[iSafe].level &&
									x.duration < arr[iSafe].duration
										? i
										: iSafe,
								0
							)
					  ].id
					: markers[closest].id;

			setBest(local_best);
		};

		const getDistances = async () => {
			try {
				let results = await fetchDistances(
					location,
					markers.map((marker) => marker.latlng)
				);

				setMarkers(
					markers.map((marker, index) => ({
						...marker,
						distance: results[index].distance,
						duration: results[index].duration,
					}))
				);
			} catch (error) {
				alert("Error getting distances");
				console.log(error);
			}
		};

		if (location && markers.length > 0) {
			getDistances();
			findBest();
		}

		// Center the map on the location we just fetched.
		setRegion({
			...INITIAL_REGION,
			...location,
		});
	}, [location]);

	useEffect(() => {
		mapRef.animateToRegion(region);
	}, [region]);

	useEffect(() => {
		address && searchRef.current?.setAddressText(address);
	}, [address]);

	// Function to get user location asynchornously
	const getLocationAsync = async () => {
		hideOptions();
		try {
			// ask for location permission
			let { status } = await Location.requestPermissionsAsync();

			// if location permission is not granted
			if (status !== "granted") {
				// if this is the first time we are asking for permission
				if (location_access == null) {
					// note that permission has been denied
					denyLocationAccess();

					// return to screen, as there is nothing to be done if location permission is denied
					return;
				}

				// if it is not the first time asking for location and it has been denied so far
				if (!location_access) {
					// Show an alert asking whether user want's to change location access in app settings
					Alert.alert(
						"No Permission for Location Access",
						"Permission to access location was denied, personalized features will be disabled unless location access is reactivated in settings. Do you wish to change settings?",
						[
							{
								text: "Yes",
								onPress: openSetting,
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
				allowLocationAccess();
			}

			// get current location
			let current_location = await Location.getCurrentPositionAsync({});

			current_location = {
				latitude: current_location.coords.latitude,
				longitude: current_location.coords.longitude,
			};

			const isLocationOutside = !isPointWithinRadius(
				current_location,
				{
					latitude: INITIAL_REGION.latitude,
					longitude: INITIAL_REGION.longitude,
				},
				3000
			);

			if (isLocationOutside) {
				denyLocationAccess();
				Alert.alert(
					"Unservicable Location",
					"Sorry! We cannot serve the location you are currently at, as it is out of the city radius that we serve."
				);
				return;
			}

			// set location globally
			setLocation(current_location);

			let current_address = (
				await Location.reverseGeocodeAsync(location, {
					useGoogleMaps: true,
				})
			)[0];

			current_address = `${address.name}, ${address.city}, ${address.region}, ${address.country}`;

			setAddress(current_address);
		} catch (error) {
			location_access == null && getLocationAsync();
		}
	};

	// render map view
	return (
		<>
			{/*create a map view component with region focusing on melbourne*/}
			<MapView
				style={styles.map}
				provider={MapView.PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				zoomControlEnabled={false}
				onPress={hideOptions}
				ref={(ref) => (mapRef = ref)}
				minZoomLevel={13}
				onLayout={() =>
					mapRef.setMapBoundaries(
						{
							latitude: INITIAL_REGION.latitude + INITIAL_REGION.latitudeDelta,
							longitude:
								INITIAL_REGION.longitude + INITIAL_REGION.longitudeDelta,
						},
						{
							latitude: INITIAL_REGION.latitude - INITIAL_REGION.latitudeDelta,
							longitude:
								INITIAL_REGION.longitude - INITIAL_REGION.longitudeDelta,
						}
					)
				}
			>
				{
					// set up markers from state onto the map view
					markers.map((marker) => {
						return (
							<Marker
								key={marker.id}
								coordinate={marker.latlng}
								onPress={hideOptions}
								tracksViewChanges={false}
							>
								{/*Make markers have a customized image with color*/}
								<Image
									source={props.marker_icon}
									style={{
										...(best && marker.id == best
											? styles.recommendation_marker
											: styles.marker),
										tintColor: COLORS.levels[marker.level],
									}}
								/>
								{/*Create a popup with details for marker and with redirection button to google maps for directions*/}
								<Callout
									style={styles.callout}
									onPress={() =>
										Linking.openURL(
											`${directions_server_address}` +
												(!location
													? ""
													: `&origin=${location.latitude},${location.longitude}`) +
												`&destination=${marker.latlng.latitude},${marker.latlng.longitude}`
										)
									}
								>
									<View>
										<Text>{marker.place}</Text>
										{props.value_name ? (
											<Text>
												{props.value_name}: {marker.value}
											</Text>
										) : (
											<></>
										)}
										<Text>
											{props.level_name}: {marker.level}
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
										<Text>Last updated: {marker.time}</Text>
										<Button
											title="Directions"
											color={COLORS.dark}
											accessibilityLabel="This button redirects you to google maps for directions to the location"
										/>
									</View>
								</Callout>
							</Marker>
						);
					})
				}
				{location ? (
					<Marker
						coordinate={location}
						onPress={hideOptions}
						tracksViewChanges={false}
					>
						<Image
							source={require("../assets/images/location.png")}
							style={styles.location_marker}
						/>
					</Marker>
				) : (
					<></>
				)}
			</MapView>
			{/* Show search bar for places autocomplete */}
			<GooglePlacesAutocomplete
				ref={searchRef} // Reference to be used to access input
				textInputProps={{
					onFocus: () => {
						hideOptions();
						searchRef.current?.setAddressText("");
					},
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
						top: "10%",
						left: "3%",
						right: "3%",
						zIndex: 999,
					},
					listView: { width: "95%" },
				}}
				onPress={(data, details = null) => {
					// On selecting suggestion, Set location to that suggestion
					setLocation({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
					});

					// update address on search bar to current location
					setAddress(data.description);
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
						onPress={getLocationAsync}
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
};

// create all general styles for each component in one constant stylesheet
const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	},
	marker: {
		height: 25,
		width: 25,
		borderRadius: 25,
		backgroundColor: COLORS.dark,
	},
	location_marker: {
		height: 40,
		width: 40,
		borderRadius: 40,
		backgroundColor: COLORS.dark,
		tintColor: COLORS.light,
		zIndex: 900,
	},
	recommendation_marker: {
		height: 40,
		width: 40,
		borderRadius: 40,
		backgroundColor: COLORS.highlight,
		zIndex: 900,
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

export default memo(Map);
