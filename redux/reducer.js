import * as Types from "./types";

const initialState = {
	show_options: false,
	location_access: null,
	location: null,
	address: null,
	isLoading: false,
	errMess: null,
	pedestrian_counts: [],
	pso_stations: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.SET_ADDRESS:
			return {
				...state,
				address: action.payload,
			};

		case Types.SET_LOCATION:
			return {
				...state,
				location: action.payload,
			};

		case Types.ALLOW_LOCATION_ACCESS:
			return {
				...state,
				location_access: true,
			};

		case Types.DENY_LOCATION_ACCESS:
			return {
				...state,
				location_access: false,
			};

		case Types.SHOW_OPTIONS:
			return {
				...state,
				show_options: true,
			};

		case Types.HIDE_OPTIONS:
			return {
				...state,
				show_options: false,
			};

		case Types.PEDESTRIAN_COUNTS_LOADING:
			return {
				...state,
				isLoading: true,
				errMess: null,
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
			};

		case Types.PSO_STATIONS_LOADING:
			return {
				...state,
				isLoading: true,
				errMess: null,
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
			};

		default:
			return state;
	}
};

export default reducer;
