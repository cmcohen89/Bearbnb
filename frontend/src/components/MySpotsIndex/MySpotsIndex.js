import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Switch, NavLink, Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import { removeSpot } from '../../store/spots';
import './MySpotsIndex.css'

const MySpotsIndex = () => {
  const dispatch = useDispatch();

  let spots = useSelector(state => Object.values(state.spots));
  const user = useSelector(state => state.session.user);
  spots = spots.filter((spot) => user.id === spot.ownerId)

  useEffect(() => {
    dispatch(getSpots()); // refactor into getUserSpots??
  }, [dispatch])

  if (!spots) return null;

  return (
    <div>
      <h2 className='review-title'>My Spots</h2>
      <div className='my-spots'>
        {spots.map((spot) => (
          <div className='one-review'>
            <h3>
              <NavLink className='review-link' to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            </h3>
            {spot.previewImage && <img className='review-image' src={spot.previewImage} alt={spot.name}></img>}
            <h4 className='spot-location'>{spot.address}, {spot.city}, <br></br>{spot.state}, {spot.country}</h4>
            <h4 className='spot-star'><i class="fa-solid fa-star star"></i>
              {spot.avgRating ? spot.avgRating : "New"}</h4>
            <p className='review-description'>{spot.description}</p>
            <div className='review-buttons'>
              <NavLink to={`spots/${spot.id}/edit`}><button className='review-button'>Edit Spot</button></NavLink>
              <button className='review-button' onClick={
                (e) => {
                  e.preventDefault();
                  dispatch(removeSpot(spot.id))
                }
              }>Delete Spot</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySpotsIndex;
