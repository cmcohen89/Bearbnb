import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addImage, createSpot } from '../../store/spots';
import './CreateSpotForm.css'

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
  const [errors, setErrors] = useState([]);

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
    let newSpot = await dispatch(createSpot(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

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
    <div className='create-form'>
      <div className='top-bar'>
        <span></span>
        <span className='create-title'>Create a spot</span>
        <span></span>
      </div>
      <div className='main-field2'>
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
            className="price input"
            placeholder='Price'
            max='999999'
            min='0'
            required
            value={price}
            onChange={updatePrice} />
          <input
            type="text input"
            className='previewImg'
            placeholder="Preview Image URL"
            value={imgUrl}
            required
            onChange={updateImgUrl} />
          <button className='create-spot-button' type="submit">Create Spot</button>
        </form>
      </div>
    </div>
  );

};

export default CreateSpotForm;




// return (
//   <section>
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Address"
//         required
//         value={address}
//         onChange={updateAddress} />
//       <input
//         type="text"
//         placeholder="City"
//         required
//         value={city}
//         onChange={updateCity} />
//       <input
//         type="text"
//         placeholder="State"
//         required
//         value={state}
//         onChange={updateState} />
//       <input
//         type="text"
//         placeholder="Country"
//         required
//         value={country}
//         onChange={updateCountry} />
//       <input
//         type="text"
//         placeholder="Spot Name"
//         required
//         value={name}
//         onChange={updateName} />
//       <textarea
//         type="text"
//         placeholder="Description"
//         required
//         value={description}
//         onChange={updateDescription} />
//       <input
//         type="text"
//         placeholder='Price'
//         required
//         value={price}
//         onChange={updatePrice} />
//       <input
//         type="text"
//         placeholder="Preview Image URL"
//         value={imgUrl}
//         onChange={updateImgUrl} />
//       <button className='submit' type="submit">Create Spot</button>
//     </form>
//   </section>
// );
