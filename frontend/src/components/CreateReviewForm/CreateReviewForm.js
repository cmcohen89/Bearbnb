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

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      review,
      stars
    };

    const newReview = await dispatch(createReview(payload, spot, user));
    const spots = await dispatch(getSpots());
    console.log(spots.Spots[id]);
    if (newReview) history.push(`/spots/${id}`);
  };

  return (
    <div className='review-form'>
      <div className='top-bar'>
        {/* <button className="x" onClick={() => setShowModal(false)}><i class="fa-solid fa-xmark"></i></button> */}
        <span></span>
        <span className='review-title'>Write a review</span>
        <span></span>
      </div>
      <div className='main-field'>
        <form className='form' onSubmit={handleSubmit}>
          {/* {!!errors.length && <ul>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>} */}
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



// return (
//   <section>
//     <form onSubmit={handleSubmit}>
//       <label>
//         Review
//         <textarea
//           type="text"
//           placeholder="Tell us about your experience!"
//           required
//           value={review}
//           onChange={updateReview} />
//       </label>
//       <label>
//         Stars
//         <select
//           value={stars}
//           onChange={updateStars}
//         >
//           <option>1</option>
//           <option>2</option>
//           <option>3</option>
//           <option>4</option>
//           <option>5</option>
//         </select>
//       </label>
//       <button className='submit' type="submit">Create Review</button>
//     </form>
//   </section>
// );
