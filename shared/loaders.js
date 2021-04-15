import { API_KEY, distance_server_address, server_address } from "./constants";
import { Actions } from "../redux/actions";

export const fetchPedestrianCounts = () => (dispatch) => {
	dispatch(Actions.pedestrianCountsLoading());
	console.log("Loading Pedestrian Counts");
	return fetch(server_address + "pedestrian_counts")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(response.status + ": " + response.statusText);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((pedestrian_counts) =>
			dispatch(Actions.addPedestrianCounts(pedestrian_counts))
		)
		.catch((error) => {
			dispatch(Actions.pedestrianCountsFailed(error.message));
			console.log(error.message);
		});
};

export const fetchPsoStations = () => (dispatch) => {
	dispatch(Actions.psoStationsLoading());
	console.log("Loading PSO Stations");
	return fetch(server_address + "pso_stations")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(response.status + ": " + response.statusText);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((pso_stations) => dispatch(Actions.addPsoStations(pso_stations)))
		.catch((error) => {
			dispatch(Actions.distancesFailed(error.message));
			console.log(error.message);
		});
};

export const fetchDistances = (start, ends) => {
	const request =
		distance_server_address +
		`&origins=${start.latitude},${start.longitude}` +
		`&destinations=${ends
			.map((end) => `${end.latitude},${end.longitude}`)
			.join("|")}` +
		`&key=${API_KEY}` +
		`&mode=walking`;
	return fetch(request)
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error(response.status + ": " + response.statusText);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((json) => {
			console.log(JSON.stringify(json));
			return json.rows[0].elements.map((element) => ({
				duration: Math.ceil(element.duration.value / 60),
				distance: element.distance.value,
			}));
		});
};
