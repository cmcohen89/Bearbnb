export const getAllSpots = (state) => Object.values(state.spots);
export const getSpotById = (id) => (state) => state.spots[id];

const ADD_SPOT = 'spot/ADD';
const UPDATE_SPOT = 'spot/UPDATE';
const DELETE_SPOT = 'spot/DELETE';

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  }
}

export const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}
