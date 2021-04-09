import * as Types from "./types";

const initialState = {
	location_access: null,
	location: null,
	address: null,
	isLoading: true,
	errMess: null,
	pedestrian_counts: [],
	pso_stations: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.SET_LOCATION:
			return {
				...state,
				isLoading: false,
				errMess: null,
				location: action.payload,
			};

		case Types.SET_ADDRESS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				address: action.payload,
			};

		case Types.ALLOW_LOCATION_ACCESS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				location_access: true,
			};

		case Types.DENY_LOCATION_ACCESS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				location_access: false,
			};

		case Types.PEDESTRIAN_COUNTS_LOADING:
			return {
				...state,
				isLoading: true,
				errMess: null,
				pedestrian_counts: [],
			};

		case Types.ADD_PEDESTRIAN_COUNTS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				pedestrian_counts: action.payload,
			};

		case Types.PEDESTRIAN_COUNTS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				pedestrian_counts: [],
			};

		case Types.PSO_STATIONS_LOADING:
			return {
				...state,
				isLoading: true,
				errMess: null,
				pso_stations: [],
			};

		case Types.ADD_PSO_STATIONS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				pso_stations: action.payload,
			};

		case Types.PSO_STATIONS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				pso_stations: [],
			};

		default:
			return state;
	}
}
