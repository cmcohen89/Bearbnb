import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD';
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE'
const ADD_SPOT = 'spots/ADD';
const ADD_SPOT_IMG = 'spots/ADD_IMG';
const ADD_ANOTHER_SPOT_IMG = 'spots/ADD_ANOTHER_IMG';
const UPDATE_SPOT = 'spots/UPDATE';
const DELETE_SPOT = 'spots/DELETE';
const DELETE_IMG = 'spots/DELETE_IMG';

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

export const loadSingleSpot = (spot) => {
  return {
    type: LOAD_SINGLE_SPOT,
    spot
  };
};

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  };
};

export const addSpotImg = (img, spot) => {
  return {
    type: ADD_SPOT_IMG,
    img,
    spot
  };
};

export const addAnotherSpotImg = (img, spot) => {
  return {
    type: ADD_ANOTHER_SPOT_IMG,
    img,
    spot
  }
}

export const updateSpot = (spot, img) => {
  return {
    type: UPDATE_SPOT,
    spot,
    img
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

export const deleteImage = (imgId, spotId) => {
  return {
    type: DELETE_IMG,
    imgId,
    spotId
  }
}

export const getSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots;
  };
};

export const getSingleSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadSingleSpot(spot));
    return spot;
  };
};

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
  };
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
  };
};

export const addAnotherImage = (payload, spot) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const img = await response.json();
    dispatch(addAnotherSpotImg(img, spot));
    return img;
  };
};

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
  };
};

export const removeSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(deleteSpot(spotId));
    return deletedMessage;
  };
};

export const removeImage = (imgId, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spot-images/${imgId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(deleteImage(imgId, spotId));
    return deletedMessage;
  }
}

export const getAllSpots = (state) => Object.values(state.spots);
export const getSpotById = (id) => (state) => state.spots[id];

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      // const allSpots = {};
      // action.spots.Spots.forEach(spot => {
      //   allSpots[spot.id] = spot;
      // });
      // return allSpots;
      return action.spots.Spots.reduce((spots, spot) => {
        spots[spot.id] = spot;
        return spots;
      }, {});
    case LOAD_SINGLE_SPOT:
      return {
        [action.spot.id]: { ...action.spot }
      }
    case ADD_SPOT:
      return {
        ...state,
        [action.spot.id]: { ...action.spot }
      };
    case ADD_SPOT_IMG:
      return {
        ...state,
        [action.spot.id]: { ...action.spot, previewImage: action.img.url }
      };
    case ADD_ANOTHER_SPOT_IMG:
      return {
        ...state,
        [action.spot.id]: { ...action.spot, SpotImages: [...action.spot.SpotImages, { ...action.img }] }
      }
    case UPDATE_SPOT:
      return {
        ...state,
        [action.spot.id]: { ...action.spot, previewImage: action.img }
      };
    case DELETE_SPOT:
      delete newState[action.spotId];
      return newState;
    case DELETE_IMG:
      const img = newState[action.spotId.SpotImages].find(img => img.id === action.imgId);
      delete newState[action.spotId.SpotImages[img.id]]
      return newState;
    default:
      return state;
  };
};

export default spotsReducer;
