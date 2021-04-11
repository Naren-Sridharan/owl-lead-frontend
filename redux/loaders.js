import { server_address } from "../shared/constants";
import * as Types from "./types";
import { actionCreators } from "./actions";

export const fetchPedestrianCounts = () => (dispatch) => {
	dispatch(actionCreators.pedestrianCountsLoading());
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
			dispatch(actionCreators.addPedestrianCounts(pedestrian_counts))
		)
		.catch((error) => {
			dispatch(actionCreators.pedestrianCountsFailed(error.message));
			console.log(error.message);
		});
};

export const fetchPsoStations = () => (dispatch) => {
	dispatch(actionCreators.psoStationsLoading());
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
		.then((pso_stations) =>
			dispatch(actionCreators.addPsoStations(pso_stations))
		)
		.catch((error) => {
			dispatch(actionCreators.psoStationsFailed(error.message));
			console.log(error.message);
		});
};
