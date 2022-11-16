import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import { addImage, createSpot, getSpotById } from '../../store/spots';
import { getSpots } from '../../store/spots';
import './ReservationForm.css'

const ReservationForm = ({ thisSpot }) => {
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
    <div className='reservation-div'>
      <div className='reservation-top-bar'>
        <span><span className='reservation-price'>${thisSpot.price}</span> <span className='night'>night</span></span>
        <span className='reservation-rating-review'>
          <i class="fa-solid fa-star"></i>{" "}
          {thisSpot.avgStarRating} · <a>{thisSpot.numReviews} {thisSpot.numReviews === 1 ? 'review' : 'reviews'}</a></span>
      </div>
      <div className='main-field'>
        <form className='reservation-form' onSubmit={handleSubmit}>
          <div className='check-in-check-out'>
            <div className='check-in-dropdown'>
              <span>CHECK-IN</span>
              <input
                className='date'
                type="date"
                // value={credential}
                // onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className='check-out-dropdown'>
              <span>CHECKOUT</span>
              <input
                className='date'
                type="date"
                // value={credential}
                // onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
          </div>
          <input
            className="guests-dropdown"
            type="number"
            min='1'
            max='4'
            placeholder="Guests"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='reserve' type="submit">Reserve</button>
          <p className='charged'>You won't be charged yet</p>
          <div className='costs'>
            <a>${thisSpot.price} x 7 nights</a>
            <span>${thisSpot.price * 7}</span>
          </div>
          <div className='costs'>
            <a>Cleaning fee</a>
            <span>$17</span>
          </div>
          <div className='costs'>
            <a>Service fee</a>
            <span>$120</span>
          </div>
          <span className='line2'></span>
          <div className='reservation-total'>
            <span>Total before taxes:</span>
            <span>${(thisSpot.price * 7) + 137}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
