import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD';
const ADD_SPOT = 'spot/ADD';
const ADD_SPOT_IMG = 'spot/ADD_IMG';
const UPDATE_SPOT = 'spot/UPDATE';
const DELETE_SPOT = 'spot/DELETE';

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
}

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  }
}

export const addSpotImg = (img, spot) => {
  return {
    type: ADD_SPOT_IMG,
    img,
    spot
  }
}

export const updateSpot = (spot, img) => {
  return {
    type: UPDATE_SPOT,
    spot,
    img
  }
}

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

export const getSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
  }
}

export const createSpot = (payload) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
  }
};

export const addImage = (payload, spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const img = await response.json();
    dispatch(addSpotImg(img, spot));
    return img;
  }
}

export const editSpot = (payload, spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot, spot.previewImage));
    return updatedSpot;
  }
}

export const removeSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(deleteSpot(spotId));
    return deletedMessage;
  }
}

export const getAllSpots = (state) => Object.values(state.spots);
export const getSpotById = (id) => (state) => state.spots[id];

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpots = {};
      action.spots.Spots.forEach(spot => {
        allSpots[spot.id] = spot;
      });
      return {
        ...allSpots,
        ...state,
      }
    case ADD_SPOT:
      return {
        ...state,
        [action.spot.id]: { ...action.spot }
      }
    case ADD_SPOT_IMG:
      return {
        ...state,
        [action.spot.id]: { ...action.spot, previewImage: action.img.url }
      }
    case UPDATE_SPOT:
      return {
        ...state,
        [action.spot.id]: { ...action.spot, previewImage: action.img }
      }
    case DELETE_SPOT:
      const newState = { ...state };
      delete newState[action.spotId]
      return newState;
    default:
      return state;
  }
}

export default spotsReducer;
