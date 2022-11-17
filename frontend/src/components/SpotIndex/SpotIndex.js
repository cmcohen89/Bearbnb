import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './SpotIndex.css';
import SpotTypeBar from '../SpotTypeBar/SpotTypeBar';

const SpotIndex = () => {
  const dispatch = useDispatch();

  let spots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div className='spot-index'>
      <SpotTypeBar />
      <div className='all-spots'>
        {spots.map((spot) => (
          <div className='one-spot'>
            <NavLink className='spot-link' to={`/spots/${spot.id}`}>
              <div className='spot-image-container'>
                {spot.previewImage && <img className='spot-image' src={spot.previewImage} alt={spot.name}></img>}
              </div>
              <h3 className='spot-location'>
                {spot.city}, {spot.state}
                <span className="spot-star">
                  <i class="fa-solid fa-star star"></i>
                  {spot.avgRating ? spot.avgRating : "New"}
                </span>
              </h3>
              <span className='miles'>{Math.ceil(Math.random() * 100) + 1} miles away</span><br></br>
              <span className='miles'>Added {Math.ceil(Math.random() * 10) + 1} weeks ago</span>
              <h4>${spot.price} <span className='night'>night</span></h4>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpotIndex;
