import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
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
      <h2 className='review-title'>My Reviews</h2>
      <div className='my-reviews'>
        {reviews.map((review) => (
          <div className='one-review'>
            <h3>
              <NavLink className='review-link' to={`/spots/${review.Spot.id}`}>{review.Spot.name}</NavLink>
            </h3>
            {review.Spot.previewImage && <img className='review-image' src={review.Spot.previewImage} alt={review.Spot.name}></img>}
            <h4>{review.Spot.address}, {review.Spot.city}, <br></br>{review.Spot.state}, {review.Spot.country}</h4>
            <h4>Reviewed on: {review.createdAt}</h4>
            <span className='spot-star'><i className="fa-solid fa-star star"></i>{review.stars}</span>
            <p className='review-description'>{review.review}</p>
            <div className='review-buttons'>
              <NavLink to={`reviews/${review.id}/edit`}><button className='review-button'>Edit Review</button></NavLink>
              <button className='review-button' onClick={
                (e) => {
                  e.preventDefault();
                  dispatch(removeReview(review.id))
                }
              }>Delete Review</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyReviewsIndex;
