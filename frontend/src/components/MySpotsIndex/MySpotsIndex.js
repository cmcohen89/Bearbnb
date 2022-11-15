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
    <>
      <h2>My Spots</h2>
      <div className='my-spots'>
        {spots.map((spot) => (
          <div className='spot'>
            <h3>
              <NavLink className='spotName' to={`/spots/${spot.id}`}>{spot.name}</NavLink>
              <NavLink to={`spots/${spot.id}/edit`}><button>Edit Spot</button></NavLink>
              <button onClick={
                (e) => {
                  e.preventDefault();
                  dispatch(removeSpot(spot.id))
                }
              }>Delete Spot</button>
            </h3>
            {spot.previewImage && <img style={{ width: 500 }} src={spot.previewImage} alt={spot.name}></img>}
            <h4>{spot.address}, {spot.city}, {spot.state}, {spot.country}</h4>
            <h4>{spot.avgRating ? spot.avgRating : "No "} {spot.avgRating !== 1 ? 'Stars' : 'Star'}, ${spot.price}</h4>
            <p>{spot.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default MySpotsIndex;
