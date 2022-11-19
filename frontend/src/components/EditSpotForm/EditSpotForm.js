import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSpot, getSingleSpot } from '../../store/spots';
import { getSpotById } from '../../store/spots';

const EditSpotForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(getSpotById(id))
  const history = useHistory();

  const [address, setAddress] = useState(spot ? spot.address : '');
  const [city, setCity] = useState(spot ? spot.city : '');
  const [state, setState] = useState(spot ? spot.state : '');
  const [country, setCountry] = useState(spot ? spot.country : '');
  const [name, setName] = useState(spot ? spot.name : '');
  const [description, setDescription] = useState(spot ? spot.description : '');
  const [price, setPrice] = useState(spot ? spot.price : 0);
  const [errors, setErrors] = useState([]);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  useEffect(() => {
    dispatch(getSingleSpot(id));
  }, [dispatch, id])

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
    let updatedSpot = await dispatch(editSpot(payload, spot))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });


    if (updatedSpot) history.push(`/my_spots`);
  };

  if (!spot) return null;

  return (
    <div className='create-form'>
      <div className='top-bar1'>
        <span></span>
        <span className='create-title'>Edit spot</span>
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
            className='address input'
            type="text"
            placeholder="Address"
            value={address}
            onChange={updateAddress}
            required
          />
          <input
            className='city input'
            type="text"
            placeholder="City"
            value={city}
            onChange={updateCity}
            required
          />
          <input
            className="state input"
            type="text"
            placeholder="State"
            value={state}
            onChange={updateState}
            required
          />
          <input
            className="country input"
            placeholder="Country"
            type="text"
            value={country}
            onChange={updateCountry}
            required
          />
          <input
            className="spot_name input"
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
            type="number"
            className="price2 input"
            placeholder='Price'
            required
            value={price}
            onChange={updatePrice} />
          <button className='create-spot-button' type="submit">Update Spot</button>
        </form>
      </div>
    </div>
  );
};

export default EditSpotForm;
