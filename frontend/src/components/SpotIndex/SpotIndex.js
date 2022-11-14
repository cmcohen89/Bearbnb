import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, NavLink, Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SingleSpot from '../SingleSpot/SingleSpot';
import './SpotIndex.css';

const SpotIndex = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div>
      <h2 class="title">Spots</h2>
      {spots.map((spot) => (
        <div class='spots'>
          <h3><NavLink className='spotName' to={`/spots/${spot.id}`}>{spot.name}</NavLink></h3>
          {spot.previewImage && <img style={{ width: 500 }} src={spot.previewImage} alt={spot.name}></img>}
          <h4>{spot.address}, {spot.city}, {spot.state}, {spot.country}</h4>
          <h4>{spot.avgRating ? spot.avgRating : "No "} {spot.avgRating !== 1 ? 'Stars' : 'Star'}, ${spot.price}</h4>
          <p>{spot.description}</p>
        </div>
      ))}
    </div>
  )
}

export default SpotIndex;
