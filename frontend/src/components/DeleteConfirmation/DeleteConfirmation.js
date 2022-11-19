import { useDispatch } from 'react-redux';
import { removeSpot } from '../../store/spots';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ data, setShowSpotDeleteModal }) => {
  const dispatch = useDispatch();
  const spot = data;

  return (
    <div className='delete-confirmation'>
      <h1>Are you sure you want to delete this spot?</h1>
      <h2>This cannot be undone!</h2>
      <div>
        <button className='my-spots-button-back' onClick={
          (e) => {
            e.preventDefault();
            dispatch(removeSpot(spot.id))
            setShowSpotDeleteModal(false);
          }
        }>Yes, delete</button>
        <button className='my-spots-button-back' onClick={
          (e) => {
            setShowSpotDeleteModal(false);
          }
        }>No, go back</button>
      </div>
    </div>
  )
}

export default DeleteConfirmation;
