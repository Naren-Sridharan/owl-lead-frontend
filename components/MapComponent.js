import React, { useRef, useState, useEffect, memo } from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	Button,
	Text,
	Linking,
	TouchableOpacity,
	Platform,
	Alert,
} from "react-native";
import { Card } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../redux/actions";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { isPointWithinRadius } from "geolib";
import * as Location from "expo-location";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
	API_KEY,
	COLORS,
	directions_server_address,
	IMAGES,
} from "../shared/constants";
import { fetchDistances } from "../shared/loaders";

const { width, height } = Dimensions.get("window");

// set initial location region
const INITIAL_REGION = {
	latitude: -37.8138,
	longitude: 144.9578,
	latitudeDelta: 0.04,
	longitudeDelta: 0.04 * (width / height),
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

	// initialize state with markers, user location and type of value being displayed
	const [markers, setMarkers] = useState(!props.markers ? [] : props.markers);
	const [best, setBest] = useState(null);
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [distance, setDistance] = useState(null);
	const [duration, setDuration] = useState(null);
	const [tracksViewChanges, setTracksViewChanges] = useState(true);

	// redux actions
	const dispatch = useDispatch();
	const setAddress = (address) => dispatch(Actions.setAddress(address));
	const setLocation = (location) => dispatch(Actions.setLocation(location));
	const allowLocationAccess = () => dispatch(Actions.allowLocationAccess());
	const denyLocationAccess = () => dispatch(Actions.denyLocationAccess());

	// references to search bar and mapview components
	let searchRef = useRef(null);
	let mapRef = useRef(null);
	let markerRefs = {};

	const focusOnLocation = () =>
		location &&
		mapRef.animateToRegion({
			latitudeDelta: INITIAL_REGION.latitudeDelta / 3,
			longitudeDelta: INITIAL_REGION.longitudeDelta / 3,
			...location,
		});
	const updateMarkers = () => setTracksViewChanges(true);
	const stopMarkerUpdates = () => setTracksViewChanges(false);

	const hideOptions = () => {
		dispatch(Actions.hideOptions());
		dispatch(Actions.hideEmergencyOptions());
	};

	const hidePopup = () =>
		selectedMarker &&
		markerRefs.hasOwnProperty(selectedMarker.id) &&
		markerRefs[selectedMarker.id].hideCallout();

	Location.setGoogleApiKey(API_KEY);

	const getDistances = async () => {
		if (!location || markers.length == 0) {
			return;
		}
		try {
			let results = await fetchDistances(
				location,
				markers.map((marker) => marker.latlng)
			);

			setMarkers(
				markers.map((marker, index) => ({
					...marker,
					distance: results[index].distance,
				}))
			);
		} catch (error) {
			alert("Error getting distances");
			console.log(error);
		}
	};

	useEffect(() => {
		getDistances();
		focusOnLocation();
	}, [location]);

	useEffect(() => {
		selectedMarker &&
			mapRef.animateToRegion({
				latitudeDelta: INITIAL_REGION.latitudeDelta / 4,
				longitudeDelta: INITIAL_REGION.longitudeDelta / 4,
				...selectedMarker.latlng,
			});
	}, [selectedMarker]);

	useEffect(() => {
		(async () => {
			if (!location || markers.length == 0) {
				return;
			}

			if (!markers[0].distance) {
				await getDistances();
			}
			const levelValue = { LOW: -1, MODERATE: 0, HIGH: 1 };

			const closest = markers.reduce(
				(iMin, x, i, arr) => (x.distance < arr[iMin].distance ? i : iMin),
				0
			);

			let betters = markers.filter(
				(x) =>
					x.distance <= 1 &&
					x.id !== markers[closest].id &&
					(levelValue[x.level] > levelValue[markers[closest].level] ||
						(levelValue[x.level] == 1 &&
							x.value &&
							x.value > markers[closest].value))
			);

			let local_best =
				betters.length > 0
					? betters[
							betters.reduce(
								(iSafe, x, i, arr) =>
									x.level >= arr[iSafe].level &&
									x.distance < arr[iSafe].distance
										? i
										: iSafe,
								0
							)
					  ]
					: markers[closest];

			if (local_best.distance <= 1) {
				setBest(local_best.id);
			}
		})();
	}, [markers]);

	useEffect(() => {
		address && searchRef.current?.setAddressText(address);
	}, [address]);

	useEffect(() => {
		(async () => {
			if (!selectedMarker || !distance || !duration || !markerRefs) {
				return;
			}
			markerRefs[selectedMarker.id].showCallout();
		})();
	}, [distance, duration]);

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

			!location && updateMarkers();

			setSelectedMarker(null);

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
				ref={(ref) => (mapRef = ref)}
				style={styles.map}
				provider={MapView.PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				zoomControlEnabled={false}
				onPress={() => setSelectedMarker(null)}
				minZoomLevel={13}
				loadingEnabled
				showsPointsOfInterest={false}
				showsCompass={false}
				showsScale={false}
				showsIndoors={false}
				showsMyLocationButton={false}
				toolbarEnabled={false}
				pitchEnabled={false}
				onLayout={() => {
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
					);
					focusOnLocation();
				}}
			>
				{
					// set up markers from state onto the map view
					markers.map((marker) => {
						return (
							<Marker
								key={best && best == marker.id ? "best" : marker.id}
								zIndex={marker.id}
								coordinate={marker.latlng}
								onPress={() => setSelectedMarker(marker)}
								ref={(markerRef) => (markerRefs[marker.id] = markerRef)}
								tracksViewChanges={tracksViewChanges}
								stopPropagation={true}
							>
								{/*Make markers have a customized image with color*/}
								<View
									style={[
										styles.marker,
										best && marker.id === best
											? styles.recommendation_marker
											: {},
										{
											borderColor: COLORS.levels[marker.level],
										},
									]}
								>
									<Image
										onLoadEnd={stopMarkerUpdates}
										source={props.marker_icon}
										style={[
											best && marker.id === best
												? styles.recommendation_marker_image
												: styles.marker_image,
											{ tintColor: COLORS.levels[marker.level] },
										]}
										resizeMode="contain"
										fadeDuration={0}
									/>
								</View>
								{/*Create a popup with details for marker and with redirection button to google maps for directions*/}
								<Callout
									tooltip
									alphaHitTest
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
									<Card containerStyle={styles.calloutCard}>
										<Card.Title style={styles.calloutTitle}>
											{marker.place}
										</Card.Title>
										<Text style={styles.calloutCardText}>
											{props.level_name}:{" "}
											<Text
												style={{
													color: COLORS.levels[marker.level],
													fontWeight: "bold",
												}}
											>
												{marker.level}
											</Text>
										</Text>
										{props.value_name && (
											<Text style={styles.calloutCardText}>
												{props.value_name}:{" "}
												<Text
													style={{
														color: COLORS.levels[marker.level],
														fontWeight: "bold",
													}}
												>
													{marker.value}
												</Text>
											</Text>
										)}
										{distance && (
											<Text style={styles.calloutCardText}>
												Distance: {distance} kms
											</Text>
										)}
										{duration && (
											<Text style={styles.calloutCardText}>
												Duration: {duration} minutes
											</Text>
										)}
										<Button
											style={styles.calloutCardButton}
											title="Directions"
											color={COLORS.dark}
											accessibilityLabel="This button redirects you to google maps for directions to the location"
										/>
									</Card>
								</Callout>
							</Marker>
						);
					})
				}
				{location && (
					<Marker
						zIndex={999}
						cluster={false}
						coordinate={location}
						tracksViewChanges={tracksViewChanges}
					>
						<View
							style={[
								styles.marker,
								{
									...styles.recommendation_marker,
									backgroundColor: COLORS.dark,
									borderColor: COLORS.light,
								},
							]}
						>
							<Image
								onLoadEnd={stopMarkerUpdates}
								source={IMAGES.location}
								style={[
									styles.recommendation_marker_image,
									{ tintColor: COLORS.light },
								]}
								fadeDuration={0}
							/>
						</View>
					</Marker>
				)}
				{location && selectedMarker && (
					<MapViewDirections
						origin={location}
						destination={selectedMarker.latlng}
						optimizeWaypoints={true}
						apikey={API_KEY}
						strokeWidth={5}
						strokeColor={COLORS.dark}
						mode="WALKING"
						onReady={(result) => {
							setDistance(null);
							setDuration(null);
							setDistance(result.distance);
							setDuration(Math.ceil(result.duration));
						}}
					/>
				)}
			</MapView>
			{/* Show search bar for places autocomplete */}
			<GooglePlacesAutocomplete
				ref={searchRef} // Reference to be used to access input
				textInputProps={{
					onFocus: () => {
						hideOptions();
						hidePopup();
						searchRef.current?.setAddressText("");
						setSelectedMarker(null);
					},
				}}
				placeholder="Search for places in the city" // Show 'Search' in location search bar
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
						top: "15%",
						left: "3%",
						right: "3%",
						zIndex: 999,
					},
					listView: { width: "95%" },
				}}
				onPress={(data, details = null) => {
					!location && updateMarkers();
					// update address on search bar to current location
					setAddress(data.description);
					// On selecting suggestion, Set location to that suggestion
					setLocation({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
					});
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
						<Image source={IMAGES.location} style={styles.icon} />
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
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		backgroundColor: COLORS.dark,
	},
	recommendation_marker: {
		height: 40,
		width: 40,
		borderRadius: 40,
		backgroundColor: COLORS.highlight,
	},
	marker_image: {
		height: 20,
		width: 20,
	},
	recommendation_marker_image: {
		height: 35,
		width: 35,
	},
	callout: {
		height: 0.3 * height,
		width: 0.6 * width,
		backgroundColor: "transparent",
	},
	calloutCard: {
		position: "absolute",
		width: "90%",
		bottom: 10,
		backgroundColor: "white",
		borderWidth: 2,
		borderColor: COLORS.dark,
		borderRadius: 5,
		padding: 10,
		flexDirection: "column",
		alignContent: "space-between",
		alignSelf: "stretch",
	},
	calloutTitle: {
		fontWeight: "bold",
		alignSelf: "stretch",
		textAlign: "center",
		color: COLORS.dark,
		fontSize: 12,
		margin: 2,
	},
	calloutCardText: {
		alignSelf: "stretch",
		color: COLORS.dark,
		marginBottom: 2,
		fontSize: 12,
	},
	calloutCardButton: {
		alignSelf: "stretch",
		marginHorizontal: 5,
		fontSize: 12,
	},
	button: {
		backgroundColor: COLORS.dark,
		width: 40,
		height: 45,
		right: 20,
		borderRadius: 4,
		padding: 2,
		marginBottom: 4,
		borderColor: COLORS.light,
		borderWidth: 1,
	},
	icon: {
		width: 30,
		height: 30,
		top: 5,
		left: 3,
		alignContent: "center",
		tintColor: COLORS.light,
		zIndex: 999,
	},
});

export default memo(Map);
