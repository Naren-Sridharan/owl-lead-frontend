import { API_KEY, distance_server_address, server_address } from "./constants";
import { Actions } from "../redux/actions";
import { getDistance } from "geolib";

export const fetchPedestrianCounts = () => (dispatch) => {
	dispatch(Actions.pedestrianCountsLoading());
	return fetch(server_address + "pedestrian_counts")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					console.log("ERRRRRRRRRRRRooooooooRRRRRRR!");
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
		.then((pedestrian_counts) => {
			dispatch(Actions.addPedestrianCounts(pedestrian_counts));
			dispatch(Actions.setUpdateTime(Date.now()));
			return pedestrian_counts;
		})
		.catch((error) => {
			dispatch(Actions.pedestrianCountsFailed(error.message));
			console.log("Trying to Load Pedestrian Counts again");
			fetchPedestrianCounts();
		});
};

export const fetchPSOStations = () => (dispatch) => {
	dispatch(Actions.psoStationsLoading());
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
			dispatch(Actions.psoStationsFailed(error.message));
			console.log("Trying to Load PSO Stations again");
			fetchPSOStations();
		});
};

export const fetchDistances = async (start, ends, google = false) => {
	if (!google) {
		return ends.map((end) => ({ distance: getDistance(start, end) / 1000 }));
	}

	var i,
		j,
		temparray,
		chunk = 25;

	let results = [];

	for (i = 0, j = ends.length; i < j; i += chunk) {
		temparray = ends.slice(i, i + chunk);

		const request =
			distance_server_address +
			`&origins=${start.latitude},${start.longitude}` +
			`&destinations=${temparray
				.map((end) => `${end.latitude},${end.longitude}`)
				.join("|")}` +
			`&key=${API_KEY}` +
			`&mode=walking`;

		let result = await fetch(request)
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
				return json.rows[0].elements.map((element) => ({
					distance: element.distance.value,
				}));
			});

		results.push(...result);
	}

	return results;
};
