import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addImage, createSpot } from '../../store/spots';

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateImgUrl = (e) => setImgUrl(e.target.value);

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
    let newSpot = await dispatch(createSpot(payload));

    if (newSpot && imgUrl) {
      const imgPayload = {
        url: imgUrl,
        preview: true
      }
      await dispatch(addImage(imgPayload, newSpot));
    }

    if (newSpot) history.push(`/`);
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
        <input
          type="text"
          placeholder="Preview Image URL"
          value={imgUrl}
          onChange={updateImgUrl} />
        <button type="submit">Create Spot</button>
      </form>
    </section>
  );
};

export default CreateSpotForm;
