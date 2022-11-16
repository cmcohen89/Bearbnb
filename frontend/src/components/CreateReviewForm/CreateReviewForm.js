import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import { addImage, createSpot, getSpotById } from '../../store/spots';
import { getSpots } from '../../store/spots';
import './CreateReviewForm.css'

const CreateReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const { id } = useParams();
  const spot = useSelector(getSpotById(id))

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      review,
      stars
    };

    const newReview = await dispatch(createReview(payload, spot, user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    if (newReview) history.push(`/spots/${id}`);
  };

  return (
    <div className='review-form'>
      <div className='top-bar'>
        <span></span>
        <span className='review-title2'>Write a review</span>
        <span></span>
      </div>
      <div className='main-field'>
        <form className='form' onSubmit={handleSubmit}>
          <ul className='errors-ul'>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>
          <textarea
            className='review-body'
            type="text"
            placeholder="Share your thoughts about this spot!"
            value={review}
            onChange={updateReview}
            required
          />
          <label className='stars'>
            Stars:
            <select
              value={stars}
              onChange={updateStars}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </label>
          <button className='continue' type="submit">Submit review</button>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewForm;
