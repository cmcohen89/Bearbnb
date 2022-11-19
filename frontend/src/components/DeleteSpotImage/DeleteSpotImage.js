import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getSingleSpot, getAllSpots, getSpotById, removeImage } from '../../store/spots';
import './DeleteSpotImage.css';

const DeleteSpotImage = ({ id, setShowDeleteImageModal }) => {
  const dispatch = useDispatch();
  const spot = useSelector(getSpotById(id));

  // useEffect(() => {
  //   dispatch(getSingleSpot(id));
  // }, [dispatch, id]);

  if (!spot) return null;
  if (spot.SpotImages == undefined) return null;

  return (
    <>
      <h2 className='review-title'>Choose an image to delete</h2>

      <div className='my-images'>
        {spot.SpotImages.map((img) => (
          <div className='one-image'>
            {img.url && <img className='review-image' src={img.url} alt={spot.name}></img>}
            {+img.preview === 0 ? <button
              className='my-spots-button'
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeImage(img.id, spot.id));
              }
              }>Delete image</button> :
              <h4 className='my-spots-location'>Preview Image</h4>}
          </div>))}
      </div>
      <div className='back-button'>
        <button className='my-spots-button' onClick={() => setShowDeleteImageModal(false)}>Cancel</button>
      </div>
    </>

  )
}

export default DeleteSpotImage;
