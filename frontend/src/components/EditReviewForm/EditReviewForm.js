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

  const [review, setReview] = useState(currReview.review);
  const [stars, setStars] = useState(currReview.stars);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars
    };

    const updatedReview = await dispatch(editReview(payload, id, user, currReview.Spot));
    if (updatedReview) history.push(`/my_reviews`);
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
        <button className='submit' type="submit">Edit Review</button>
      </form>
    </section>
  );
};

export default EditReviewForm;
