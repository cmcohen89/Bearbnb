import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, NavLink, Link, Route, useParams } from 'react-router-dom';
import { getSpotReviews } from '../../store/reviews';
import './ReviewIndex.css';

const ReviewIndex = ({ spot }) => {
  const dispatch = useDispatch();

  let reviews = useSelector(state => Object.values(state.reviews));
  reviews = reviews.filter((review) => review.spotId === spot.id);

  for (let review of reviews) {
    review.createdAt = new Date(review.createdAt).toLocaleDateString();
  }

  useEffect(() => {
    dispatch(getSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  if (!reviews) return null;

  return (
    <div>
      <h2 class="title">Reviews</h2>
      <NavLink to={`${spot.id}/create_review`}><button>Add a Review</button></NavLink>
      <h3>{spot.avgRating} {spot.avgRating !== 1 ? 'Stars' : 'Star'} - {reviews.length} {reviews.length !== 1 ? 'Reviews' : 'Review'}</h3>
      {reviews.map((review) => (
        <div class='review'>
          <h4>{review.User.firstName}</h4>
          <h5>{review.createdAt}</h5>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewIndex;
