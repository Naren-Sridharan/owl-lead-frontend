import { server_address } from "../shared/constants";
import { Actions } from "./actions";

export const fetchPedestrianCounts = () => (dispatch) => {
	dispatch(Actions.pedestrianCountsLoading());
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
			dispatch(Actions.addPedestrianCounts(pedestrian_counts))
		)
		.catch((error) => {
			dispatch(Actions.pedestrianCountsFailed(error.message));
			console.log(error.message);
		});
};

export const fetchPsoStations = () => (dispatch) => {
	dispatch(Actions.psoStationsLoading());
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
		.then((pso_stations) => dispatch(Actions.addPsoStations(pso_stations)))
		.catch((error) => {
			dispatch(Actions.psoStationsFailed(error.message));
			console.log(error.message);
		});
};
