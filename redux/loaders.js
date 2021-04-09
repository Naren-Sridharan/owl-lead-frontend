import { server_address } from "../shared/constants";
import * as Types from "./types";

export const fetchPedestrianCounts = () => (dispatch) => {
	dispatch(pedestrianCountsLoading());
	console.log("Loading");
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
			dispatch(addPedestrianCounts(pedestrian_counts))
		)
		.catch((error) => {
			dispatch(pedestrianCountsFailed(error.message));
			console.log(error.message);
		});
};

export const pedestrianCountsFailed = (errMess) => ({
	type: Types.DISHES_FAILED,
	payload: errMess,
});

export const addPedestrianCounts = (pedestrian_counts) => ({
	type: Types.ADD_PEDESTRIAN_COUNTS,
	payload: pedestrian_counts,
});

export const pedestrianCountsLoading = () => ({
	type: Types.PEDESTRIAN_COUNTS_LOADING,
});

export const fetchPsoStations = () => (dispatch) => {
	dispatch(psoStationsLoading());
	console.log("Loading");
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
		.then((pso_stations) => dispatch(addPsoStations(pso_stations)))
		.catch((error) => {
			dispatch(psoStationsFailed(error.message));
			console.log(error.message);
		});
};

export const psoStationsFailed = (errMess) => ({
	type: Types.PSO_STATIONS_FAILED,
	payload: errMess,
});

export const addPsoStations = (pso_stations) => ({
	type: Types.ADD_PEDESTRIAN_COUNTS,
	payload: pso_stations,
});

export const psoStationsLoading = () => ({
	type: Types.PSO_STATIONS_LOADING,
});
