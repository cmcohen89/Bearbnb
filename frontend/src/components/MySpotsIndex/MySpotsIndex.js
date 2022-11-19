import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
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
            <span className='my-spots-title'>
              <NavLink className='review-link' to={`/spots/${spot.id}`}>{spot.name}</NavLink>
              <h5 className='my-spots-star'><i className="fa-solid fa-star star"></i>{spot.avgRating ? spot.avgRating : "New"}</h5>
            </span>
            {spot.previewImage && <img className='review-image' src={spot.previewImage} alt={spot.name}></img>}
            <h4 className='my-spots-location'>{spot.address}, {spot.city}, <br></br>{spot.state}, {spot.country}</h4>
            <div className='review-buttons'>
              <div>
                <NavLink to={`/spots/${spot.id}/edit`}><button className='my-spots-button'>Edit Spot</button></NavLink>
                <button className='my-spots-button' onClick={
                  (e) => {
                    e.preventDefault();
                    dispatch(removeSpot(spot.id))
                  }
                }>Delete Spot</button>
              </div>
              <div>
                <NavLink to={`/spots/${spot.id}/images`}><button className='my-spots-button'>Add Image</button></NavLink>
                <NavLink to={`/spots/${spot.id}/images/delete`}><button className='my-spots-button'>Delete Image</button></NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySpotsIndex;
