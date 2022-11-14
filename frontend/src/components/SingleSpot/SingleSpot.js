import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotById, getSpots } from '../../store/spots';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleSpot = useSelector(getSpotById(id))

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch])

  if (!singleSpot) return null;

  return (
    <div>
      <h1>{singleSpot.name}</h1>
      <img style={{ width: 800 }}
        src={singleSpot.previewImage}
        alt={singleSpot.name}
      />
      <h4>{singleSpot.address}, {singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h4>
      <h4>{singleSpot.avgRating ? singleSpot.avgRating : "No "} {singleSpot.avgRating !== 1 ? 'Stars' : 'Star'}, ${singleSpot.price}</h4>
      <p>
        {singleSpot.description}
      </p>
    </div>
  );
};

export default SingleSpot;
