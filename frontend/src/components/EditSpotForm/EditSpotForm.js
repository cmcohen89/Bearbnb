import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSpot } from '../../store/spots';
import { getSpotById } from '../../store/spots';

const EditSpotForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(getSpotById(id))
  const history = useHistory();

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [errors, setErrors] = useState([]);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      lat: 37.7645358,
      lng: 122.4730327,
      name,
      description,
      price
    };
    let updatedSpot = await dispatch(editSpot(payload, spot));

    if (updatedSpot) history.push(`/my_spots`);
  };

  return (
    <div className='create-form'>
      <div className='top-bar'>
        <span></span>
        <span className='create-title'>Edit spot</span>
        <span></span>
      </div>
      <div className='main-field'>
        <form className='form2' onSubmit={handleSubmit}>
          {!!errors.length && <ul>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>}
          <input
            className='address'
            type="text"
            placeholder="Address"
            value={address}
            onChange={updateAddress}
            required
          />
          <input
            className='city'
            type="text"
            placeholder="City"
            value={city}
            onChange={updateCity}
            required
          />
          <input
            className="state"
            type="text"
            placeholder="State"
            value={state}
            onChange={updateState}
            required
          />
          <input
            className="country"
            placeholder="Country"
            type="text"
            value={country}
            onChange={updateCountry}
            required
          />
          <input
            className="spot_name"
            placeholder="Spot name"
            type="text"
            value={name}
            onChange={updateName}
            required
          />
          <textarea
            className="description"
            placeholder="Description"
            type="text"
            value={description}
            onChange={updateDescription}
            required
          />
          <input
            type="text"
            className="price2"
            placeholder='Price'
            required
            value={price}
            onChange={updatePrice} />
          <button className='continue' type="submit">Update Spot</button>
        </form>
      </div>
    </div>
  );
};

export default EditSpotForm;
