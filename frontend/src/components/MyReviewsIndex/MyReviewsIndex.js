import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, NavLink, Link, Route, useParams } from 'react-router-dom';
import { getUserReviews, removeReview } from '../../store/reviews';
import './MyReviewsIndex.css'

const MyReviewsIndex = () => {
  const dispatch = useDispatch();

  let reviews = useSelector(state => Object.values(state.reviews));
  reviews = reviews.filter(review => review.Spot);
  for (let review of reviews) {
    review.createdAt = new Date(review.createdAt).toLocaleDateString();
  }

  useEffect(() => {
    dispatch(getUserReviews());
  }, [dispatch])

  if (!reviews) return null;

  return (
    <>
      <h2>My Reviews</h2>
      <div className='my-reviews'>
        {reviews.map((review) => (
          <div>
            <h3>
              <NavLink className='spotName' to={`/spots/${review.Spot.id}`}>{review.Spot.name}</NavLink>
            </h3>
            {review.Spot.previewImage && <img style={{ width: 500 }} src={review.Spot.previewImage} alt={review.Spot.name}></img>}
            <h4>{review.Spot.address}, {review.Spot.city}, {review.Spot.state}, {review.Spot.country}</h4>
            <h4>Reviewed on: {review.createdAt}</h4>
            <span>{review.stars} {review.stars !== 1 ? 'Stars' : 'Star'}</span>
            <p>
              {review.review}
              <NavLink to={`reviews/${review.id}/edit`}><button>Edit Review</button></NavLink>
              <button onClick={
                (e) => {
                  e.preventDefault();
                  dispatch(removeReview(review.id))
                }
              }>Delete Review</button>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyReviewsIndex;
