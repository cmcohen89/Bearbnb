import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, NavLink, Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './SpotIndex.css';
import SpotTypeBar from '../SpotTypeBar/SpotTypeBar';

const SpotIndex = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div>
      <SpotTypeBar />
      <div className='all-spots'>
        {spots.map((spot) => (
          <div className='one-spot'>
            <NavLink className='spot-link' to={`/spots/${spot.id}`}>
              {spot.previewImage && <img className='spot-image' src={spot.previewImage} alt={spot.name}></img>}
              <h3>{spot.city}, {spot.state}<span className="spot-star">{spot.avgRating ? spot.avgRating : "No "} {spot.avgRating !== 1 ? 'Stars' : 'Star'}</span></h3>
              <h4>${spot.price} night</h4>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpotIndex;
