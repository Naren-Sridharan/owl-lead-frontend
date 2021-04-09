import * as Types from './types';

const actionCreators = {
  setAddress = () => {type: Types.SET_ADDRESS},
  setLocation = () => {type: Types.SET_LOCATION},
  allowLocationAccess = () => {type: Types.ALLOW_LOCATION_ACCESS},
  denyLocationAccess = () => {type: Types.DENY_LOCATION_ACCESS},
  pedestrianCountsLoading = () => ({
    type: ActionTypes.PEDESTRIAN_COUNTS_LOADING
  }),
  addPedestrianCounts = (pedestrian_counts) => ({
    type: Types.ADD_PEDESTRIAN_COUNTS,
    payload: pedestrian_counts
  }),
  pedestrianCountsFailed = (errMess) => ({
    type: ActionTypes.PEDESTRIAN_COUNTS_FAILED,
    payload: errMess
  }),
  psoStationsLoading = () => ({
    type: ActionTypes.PSO_STATIONS_LOADING
  }),
  addPsoStations = (pso_stations) => ({
    type: ActionTypes.ADD_PSO_STATIONS,
    payload: pso_stations
  }),
  psoStationsFailed = (errMess) => ({
    type: ActionTypes.PSO_STATIONS_FAILED,
    payload: errMess
  }),
};

export {actionCreators};