import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD';
const ADD_REVIEW = 'reviews/ADD';
const ADD_REVIEW_IMG = 'reviews/ADD_IMG';
const UPDATE_REVIEW = 'reviews/UPDATE';
const DELETE_REVIEW = 'reviews/DELETE';

export const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
  };
};

export const addReview = (review, user, spot) => {
  return {
    type: ADD_REVIEW,
    review,
    user,
    spot
  };
};

export const addReviewImg = (img, review) => {
  return {
    type: ADD_REVIEW_IMG,
    img,
    review
  };
};

export const updateReview = (review, user, spot) => {
  return {
    type: UPDATE_REVIEW,
    review,
    user,
    spot
  };
};

export const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  };
};

export const getSpotReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
}

export const getUserReviews = () => async dispatch => {
  const response = await csrfFetch(`api/reviews/current`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
}

export const createReview = (payload, spot, user) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview, user, spot));
    return newReview;
  }
}

export const editReview = (payload, id, user, spot) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview, user, spot));
    return updatedReview;
  }
}

export const removeReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(deleteReview(reviewId));
    return deletedMessage;
  }
}

export const getAllReviews = (state) => Object.values(state.reviews);
export const getReviewById = (id) => (state) => state.reviews[id];

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviews = {};
      action.reviews.Reviews.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews
      };
    case ADD_REVIEW:
      return {
        ...state,
        [action.review.id]: { ...action.review, User: action.user }
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        [action.review.id]: { ...action.review, User: action.user }
      };
    case DELETE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
