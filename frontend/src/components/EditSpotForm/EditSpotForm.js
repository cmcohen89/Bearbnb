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
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={updateAddress} />
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={updateCity} />
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={updateState} />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry} />
        <input
          type="text"
          placeholder="Spot Name"
          value={name}
          onChange={updateName} />
        <textarea
          type="text"
          placeholder="Description"
          value={description}
          onChange={updateDescription} />
        <input
          type="text"
          placeholder='Price'
          value={price}
          onChange={updatePrice} />
        <button type="submit">Edit Spot</button>
      </form>
    </section>
  );
};

export default EditSpotForm;
