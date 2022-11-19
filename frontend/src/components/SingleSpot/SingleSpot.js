import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleSpot } from '../../store/spots';
import ReservationForm from '../ReservationForm/ReservationForm';
import ReviewIndex from '../ReviewIndex/ReviewIndex';
import './SingleSpot.css';
import { Modal } from '../../context/Modal';
import ComingSoon from '../ComingSoon/ComingSoon';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let spots = useSelector(state => Object.values(state.spots));
  spots = spots.filter(spot => spot.SpotImages);
  const singleSpot = spots.find(spot => spot.id === +id);

  const [show404Modal, setShow404Modal] = useState(false);

  useEffect(() => {
    dispatch(getSingleSpot(id));
  }, [dispatch, id]);

  if (!singleSpot) return null;

  const nav = document.getElementsByClassName('nav')[0];
  const body = document.getElementsByTagName('body')[0];
  nav.style.position = 'static';
  body.style.marginTop = '0';

  const previewImg = singleSpot.SpotImages.find(img => img.preview === true);
  const otherImgs = singleSpot.SpotImages.filter(img => img.preview === false).slice(0, 4);
  while (otherImgs.length < 4) {
    const placeholder = { url: 'https://i0.wp.com/dejournettgroup.com/wp-content/uploads/2021/12/placeholder.jpg?fit=636%2C475&ssl=1' }
    otherImgs.push(placeholder);
  };

  return (
    <div className='single-spot-container'>
      <div className='single-spot'>
        <h2 className='single-spot-title'>{singleSpot.name}</h2>
        <h3 className='single-spot-subtitle'>
          <div className='single-spot-subtitle-left'>
            <i className="fa-solid fa-star"></i>{" "}
            <span className='single-spot-avgRating'>{singleSpot.avgStarRating !== 'NaN' ? singleSpot.avgStarRating : "New"}</span> · <a onClick={() => setShow404Modal(true)}>{singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'Review' : 'Reviews'}</a> · <i className="fa-solid fa-medal medal2"></i> Superhost · <a onClick={() => setShow404Modal(true)}>{singleSpot.city}</a>,<a onClick={() => setShow404Modal(true)}>{singleSpot.state}</a>,<a onClick={() => setShow404Modal(true)}>{singleSpot.country}</a>
            {show404Modal && <Modal onClose={() => setShow404Modal(false)}>
              <ComingSoon setShow404Modal={setShow404Modal} />
            </Modal>}
          </div>
          <div className='single-spot-subtitle-right'>
            <span><i className="fa-solid fa-arrow-up-from-bracket arrow"></i><a onClick={() => setShow404Modal(true)}>Share</a></span>
            <span><i className="fa-regular fa-heart heart"></i><a onClick={() => setShow404Modal(true)}>Save</a></span>
          </div>
        </h3>
        <div className='img-div'>
          <img className='single-spot-img' src={previewImg.url} alt={singleSpot.name} />
          {otherImgs.map(img => (
            <img className='single-spot-img-alt' src={img.url} alt={singleSpot.name} />
          ))}
        </div>
        <div className='single-spot-lower'>
          <div className='single-spot-lower-left'>
            <div className='single-spot-lower-left-section'>
              <h3 className='entire'>Entire home hosted by {singleSpot.Owner.firstName}</h3>
              <h4 className='stats'>4 guests · 3 bedrooms · 4 beds · 3 baths</h4>
            </div>
            <div className='single-spot-lower-left-section'>
              <div className='stat-li'>
                <div>
                  <i className="fa-solid fa-medal medal"></i>
                </div>
                <div className='inner-li'>
                  <p className='stat-header-item'>{singleSpot.Owner.firstName} is a Superhost</p>
                  <span className='stat-item'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
                </div>
              </div>
              <div className='stat-li'>
                <div>
                  <i className="fa-solid fa-key key"></i>
                </div>
                <div className='inner-li'>
                  <p className='stat-header-item'>Great check-in experience</p>
                  <span className='stat-item'>100% of recent guests gave the check-in process a 5-star rating.</span>
                </div>
              </div>
              <div className='stat-li'>
                <div>
                  <i className="fa-regular fa-calendar calendar"></i>
                </div>
                <div className='inner-li'>
                  <p className='stat-header-item'>Free cancellation for 48 hours</p>
                </div>
              </div>
            </div>
            <div className='single-spot-lower-left-section'>
              <img className='aircover' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' />
              <p>Every booking includes free protection from Host cancellations, listing<br></br> inaccuracies, and other issues like trouble checking in.</p>
              <a className='learn' onClick={() => setShow404Modal(true)}>Learn more</a>
            </div>
            <div className='single-spot-lower-left-section-final'>
              <p>{singleSpot.description}</p>
            </div>
          </div>
          <div className='single-spot-lower-right'>
            <ReservationForm thisSpot={singleSpot} setShow404Modal={setShow404Modal} />
          </div>
        </div>
        <div>
          <ReviewIndex spot={singleSpot} />
        </div>
      </div>
    </div>
  );
};

export default SingleSpot;
