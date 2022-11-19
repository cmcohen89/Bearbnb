import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editReview, getReviewById } from '../../store/reviews';

const EditReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const { id } = useParams();
  const currReview = useSelector(getReviewById(id))

  const [review, setReview] = useState(currReview ? currReview.review : '');
  const [stars, setStars] = useState(currReview ? currReview.stars : 0);
  const [errors, setErrors] = useState([]);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars
    };

    const updatedReview = await dispatch(editReview(payload, id, user, currReview.Spot))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    if (updatedReview) history.push(`/my_reviews`);
  };

  return (
    <div className='review-form'>
      <div className='top-bar1'>
        <span></span>
        <span className='review-title2'>Edit review</span>
        <span></span>
      </div>
      <div className='main-field'>
        <form className='form' onSubmit={handleSubmit}>
          {!!errors.length && <ul>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>}
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
          <button className='create-spot-button' type="submit">Update review</button>
        </form>
      </div>
    </div>
  );
};

export default EditReviewForm;
