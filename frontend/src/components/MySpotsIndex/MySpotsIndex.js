import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getSingleSpot, getSpots } from '../../store/spots';
import { Modal } from '../../context/Modal';
import './MySpotsIndex.css'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import EditSpotForm from '../EditSpotForm/EditSpotForm';
import AddSpotImage from '../AddSpotImage/AddSpotImage';
import DeleteSpotImage from '../DeleteSpotImage/DeleteSpotImage';

const MySpotsIndex = () => {
  const dispatch = useDispatch();
  let spots = useSelector(state => Object.values(state.spots));
  const user = useSelector(state => state.session.user);
  spots = spots.filter((spot) => user.id === spot.ownerId)

  const [showSpotDeleteModal, setShowSpotDeleteModal] = useState(false);
  const [showSpotEditModal, setShowSpotEditModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getSpots()); // refactor into getUserSpots??
  }, [dispatch])

  if (!spots) return null;

  return (
    <div>
      <h2 className='review-title'>My Spots</h2>
      {spots.length > 0 ? null : <h1 className='review-title'>You're not the host of any spots!</h1>}
      <div className='my-spots'>
        {spots.map((spot) => (
          <div className='one-review'>
            <span className='my-spots-title'>
              <NavLink className='review-link' to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            </span>
            {spot.previewImage && <img className='review-image' src={spot.previewImage} alt={spot.name}></img>}
            <h4 className='my-spots-location'>{spot.address}, {spot.city}, <br></br>{spot.state}, {spot.country}</h4>
            <div className='review-buttons'>
              <div>
                <button className='my-spots-button' onClick={() => {
                  setModalData(spot);
                  setShowSpotEditModal(true);
                }}>Edit Spot</button>
                {showSpotEditModal && (
                  <Modal onClose={() => setShowSpotEditModal(false)}>
                    <EditSpotForm data={modalData} setShowSpotEditModal={setShowSpotEditModal} />
                  </Modal>
                )}
                <button className='my-spots-button' onClick={() => {
                  setModalData(spot);
                  setShowSpotDeleteModal(true);
                }}>Delete Spot</button>
                {showSpotDeleteModal && (
                  <Modal onClose={() => setShowSpotDeleteModal(false)}>
                    <DeleteConfirmation data={modalData} setShowSpotDeleteModal={setShowSpotDeleteModal} />
                  </Modal>
                )}
              </div>
              <div>
                <button className='my-spots-button' onClick={() => {
                  setModalData(spot);
                  setShowAddImageModal(true);
                }}>Add Image</button>
                {showAddImageModal && (
                  <Modal onClose={() => setShowAddImageModal(false)}>
                    <AddSpotImage data={modalData} setShowAddImageModal={setShowAddImageModal} />
                  </Modal>
                )}
                <button className='my-spots-button' onClick={() => {
                  dispatch(getSingleSpot(spot.id));
                  setModalData(spot.id);
                  setShowDeleteImageModal(true);
                }}>Delete Image</button>
                {showDeleteImageModal && (
                  <Modal onClose={() => setShowDeleteImageModal(false)}>
                    <DeleteSpotImage id={modalData} setShowDeleteImageModal={setShowDeleteImageModal} />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySpotsIndex;
