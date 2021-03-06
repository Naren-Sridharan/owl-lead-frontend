import * as Types from "./types";

const Actions = {
	setUpdateTime: (update_time) => ({
		type: Types.SET_UPDATE_TIME,
		payload: update_time,
	}),
	setAddress: (address) => ({ type: Types.SET_ADDRESS, payload: address }),
	setLocation: (location) => ({ type: Types.SET_LOCATION, payload: location }),
	allowLocationAccess: () => ({ type: Types.ALLOW_LOCATION_ACCESS }),
	denyLocationAccess: () => ({ type: Types.DENY_LOCATION_ACCESS }),
	showOptions: () => ({ type: Types.SHOW_OPTIONS }),
	hideOptions: () => ({ type: Types.HIDE_OPTIONS }),
	showEmergencyOptions: () => ({ type: Types.SHOW_EMERGENCY_OPTIONS }),
	hideEmergencyOptions: () => ({ type: Types.HIDE_EMERGENCY_OPTIONS }),
	pedestrianCountsLoading: () => ({
		type: Types.PEDESTRIAN_COUNTS_LOADING,
	}),
	addPedestrianCounts: (pedestrian_counts) => ({
		type: Types.ADD_PEDESTRIAN_COUNTS,
		payload: pedestrian_counts,
	}),
	pedestrianCountsFailed: (errMess) => ({
		type: Types.PEDESTRIAN_COUNTS_FAILED,
		payload: errMess,
	}),
	psoStationsLoading: () => ({
		type: Types.PSO_STATIONS_LOADING,
	}),
	addPsoStations: (pso_stations) => ({
		type: Types.ADD_PSO_STATIONS,
		payload: pso_stations,
	}),
	psoStationsFailed: (errMess) => ({
		type: Types.PSO_STATIONS_FAILED,
		payload: errMess,
	}),
	addEmergencyContact: (contact) => ({
		type: Types.ADD_EMERGENCY_CONTACT,
		payload: contact,
	}),
	removeEmergencyContact: (contact) => ({
		type: Types.REMOVE_EMERGENCY_CONTACT,
		payload: contact,
	}),
	setContacts: (contacts) => ({
		type: Types.SET_CONTACTS,
		payload: contacts,
	}),
	allowContactsAccess: () => ({
		type: Types.ALLOW_CONTACTS_ACCESS,
	}),
	denyContactsAccess: () => ({
		type: Types.DENY_CONTACTS_ACCESS,
	}),
	introShown: () => ({
		type: Types.INTRO_SHOWN,
	}),
};

export { Actions };
