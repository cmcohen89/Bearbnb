import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAnotherImage, getSingleSpot, getSpotById } from '../../store/spots';
import './AddSpotImage.css'

const AddSpotImage = ({ data, setShowAddImageModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();


  // const { id } = useParams();
  const spot = data;

  // useEffect(() => {
  //   dispatch(getSingleSpot(id));
  // }, [dispatch, id]);

  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const updateUrl = (e) => setUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      url,
      preview: false
    };

    const newImg = await dispatch(addAnotherImage(payload, spot))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    setShowAddImageModal(false);
  };

  return (
    <div className='review-form'>
      <div className='top-bar1'>
        <span></span>
        <span className='review-title2'>Add an image</span>
        <span></span>
      </div>
      <div className='main-field'>
        <form className='form2' onSubmit={handleSubmit}>
          <ul className='errors-ul'>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>
          <input
            className='url-input'
            type="url"
            placeholder="Image URL"
            value={url}
            onChange={updateUrl}
            required
          />
          <button className='create-spot-button' type="submit">Submit image</button>
        </form>
      </div>
      <div className='back-button'>
        <button className='my-spots-button' onClick={() => setShowAddImageModal(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default AddSpotImage;
