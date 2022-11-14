import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import { addImage, createSpot, getSpotById } from '../../store/spots';

const CreateReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const { id } = useParams();
  const spot = useSelector(getSpotById(id))

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars
    };

    const newReview = await dispatch(createReview(payload, spot, user));
    if (newReview) history.push(`/spots/${id}`);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          Review
          <textarea
            type="text"
            placeholder="Tell us about your experience!"
            required
            value={review}
            onChange={updateReview} />
        </label>
        <label>
          Stars
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
        <button type="submit">Create Review</button>
      </form>
    </section>
  );
};

export default CreateReviewForm;
