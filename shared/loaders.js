import { API_KEY, distance_server_address, server_address } from "./constants";
import { Actions } from "../redux/actions";

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
			return pedestrian_counts;
		})
		.catch((error) => {
			dispatch(Actions.pedestrianCountsFailed(error.message));
			throw error;
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
			dispatch(Actions.distancesFailed(error.message));
		});
};

export const fetchDistances = async (start, ends) => {
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
					duration: Math.ceil(element.duration.value / 60),
					distance: element.distance.value,
				}));
			});

		results.push(...result);
	}

	return results;
};
