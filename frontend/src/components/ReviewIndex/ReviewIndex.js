import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getSpotReviews } from '../../store/reviews';
import './ReviewIndex.css';
import { Modal } from '../../context/Modal';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import LoginForm from '../LoginFormModal/LoginForm';
import { faker } from '@faker-js/faker';

const ReviewIndex = ({ spot }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [showModal, setShowModal] = useState(false);

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
        <div className='reviews-section'>
            <div className='reviews-header'>
                <h2 className="reviews-title">
                    <i className="fa-solid fa-star"></i> {" "}
                    {spot.avgStarRating !== 'NaN' ? spot.avgStarRating : 'New'} · {" "}
                    {spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}
                </h2>
                <button className='add-review' onClick={() => setShowModal(true)}>Add a Review</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        {user ? <CreateReviewForm setShowModal={setShowModal} /> : <LoginForm setShowModal={setShowModal} />}
                    </Modal>
                )}
            </div>
            <div className='reviews-div'>
                {reviews.map((review, idx) => (
                    <div key={idx} className='review-text'>
                        <div className='review-and-img'>
                            <div className='profile-img-review-container'>
                                <img key={review.id} alt='profile picture' className='profile-img-review' src={faker.image.avatar()}></img>
                            </div>
                            <div>
                                <span className='reviewer'>{review.User.firstName}</span><br />
                                <span className='review-date'>{review.createdAt}</span>
                            </div>
                        </div>
                        <p className='spot-description'>{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewIndex;
