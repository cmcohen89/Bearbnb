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
}

export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review
  };
};

export const addReviewImg = (img, review) => {
  return {
    type: ADD_REVIEW_IMG,
    img,
    review
  };
};

export const updateReview = (review, img) => {
  return {
    type: UPDATE_REVIEW,
    review,
    img
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
        ...allReviews,
        ...state,
      };
    default:
      return state;
  }
}

export default reviewsReducer;
