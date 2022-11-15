import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotById, getSpots } from '../../store/spots';
import ReviewIndex from '../ReviewIndex/ReviewIndex';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleSpot = useSelector(getSpotById(id));
  // const singleSpot = useSelector(state => state.spots)[id];
  const blah = useSelector(state => state.reviews);

  useEffect(() => {
    console.log('useEffect dispatch(getSpots) from SingleSpot')
    dispatch(getSpots());
  }, [dispatch, blah]);

  if (!singleSpot) return null;

  return (
    <div>
      <h1>{singleSpot.name}</h1>
      <img style={{ width: 800 }}
        src={singleSpot.previewImage}
        alt={singleSpot.name}
      />
      <h4>{singleSpot.address}, {singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h4>
      <h4>${singleSpot.price}</h4>
      <p>
        {singleSpot.description}
      </p>
      <ReviewIndex spot={singleSpot} />
    </div>
  );
};

export default SingleSpot;
