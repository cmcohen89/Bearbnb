import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getUserReviews, removeReview } from '../../store/reviews';
import './MyReviewsIndex.css'
import { Modal } from '../../context/Modal';
import EditReviewForm from '../EditReviewForm/EditReviewForm';

const MyReviewsIndex = () => {
  const dispatch = useDispatch();

  let reviews = useSelector(state => Object.values(state.reviews));
  reviews = reviews.filter(review => review.Spot);
  for (let review of reviews) {
    review.createdAt = new Date(review.createdAt).toLocaleDateString();
  }

  const [showReviewEditModal, setShowReviewEditModal] = useState(false);
  const [showReviewDeleteModal, setShowReviewDeleteModal] = useState(false);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getUserReviews());
  }, [dispatch])

  if (!reviews) return null;

  return (
    <>
      <h2 className='review-title'>My Reviews</h2>
      {reviews.length > 0 ? null : <h1 className='review-title'>You haven't left any reviews!</h1>}
      <div className='my-reviews'>
        {reviews.map((review) => (
          <div className='one-review'>
            <h3>
              <NavLink className='review-link' to={`/spots/${review.Spot.id}`}>{review.Spot.name}</NavLink>
            </h3>
            {review.Spot.previewImage && <img className='review-image' src={review.Spot.previewImage} alt={review.Spot.name}></img>}
            <h4>Reviewed on: {review.createdAt}</h4>
            <span className='spot-star'><i className="fa-solid fa-star star"></i>{review.stars}</span>
            <p className='review-description'>{review.review}</p>
            <div className='review-buttons'>
              <button className='review-button' onClick={() => {
                setModalData(review);
                setShowReviewEditModal(true);
              }}>Edit Review</button>
              {showReviewEditModal && (
                <Modal onClose={() => setShowReviewEditModal(false)}>
                  <EditReviewForm data={modalData} setShowReviewEditModal={setShowReviewEditModal} />
                </Modal>
              )}
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
