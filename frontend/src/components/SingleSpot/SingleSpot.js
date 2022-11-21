import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleSpot } from '../../store/spots';
import ReservationForm from '../ReservationForm/ReservationForm';
import ReviewIndex from '../ReviewIndex/ReviewIndex';
import './SingleSpot.css';
import { Modal } from '../../context/Modal';
import ComingSoon from '../ComingSoon/ComingSoon';
import Map from '../Map/Map';
import ImageModal from '../ImageModal/ImageModal';
import { faker } from '@faker-js/faker';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let spots = useSelector(state => Object.values(state.spots));
  spots = spots.filter(spot => spot.SpotImages);
  const singleSpot = spots.find(spot => spot.id === +id);

  const [show404Modal, setShow404Modal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
            <span className='single-spot-avgRating'>{singleSpot.avgStarRating !== 'NaN' ? singleSpot.avgStarRating : "New"}</span> · {" "}
            <a onClick={() => setShow404Modal(true)}>{singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'Review' : 'Reviews'}</a> · {" "}
            <i className="fa-solid fa-medal medal2"></i> Superhost · {" "}
            <a onClick={() => setShow404Modal(true)}>{singleSpot.city}</a>,
            <a onClick={() => setShow404Modal(true)}>{singleSpot.state}</a>,
            <a onClick={() => setShow404Modal(true)}>{singleSpot.country}</a>
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
          <img className='single-spot-img' onClick={() => {
            setShowImageModal(true)
            setModalData(previewImg.url)
          }
          } src={previewImg.url} alt={singleSpot.name} />
          {otherImgs.map(img => (
            <img className='single-spot-img-alt' onClick={() => {
              setShowImageModal(true)
              setModalData(img.url)
            }} src={img.url} alt={singleSpot.name} />
          ))}
          {showImageModal && <Modal onClose={() => setShowImageModal(false)}>
            <ImageModal setShowImageModal={setShowImageModal} data={modalData} />
          </Modal>}
        </div>
        <div className='single-spot-lower'>
          <div className='single-spot-lower-left'>
            <div className='single-spot-lower-left-section'>
              <div className='entire-and-img'>
                <div>
                  <h3 className='entire'>Entire home hosted by {singleSpot.Owner.firstName}</h3>
                  <h4 className='stats'>4 guests · 3 bedrooms · 4 beds · 3 baths</h4>
                </div>
                <img className='profile-img' src={faker.image.avatar()}></img>
              </div>
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
            <div className='single-spot-lower-left-section'>
              <p className='spot-description'>{singleSpot.description}</p>
            </div>
            <div className='single-spot-lower-left-section-final'>
              <p className='entire'>What this place offers</p>
              <div className='offerings'>
                <div className='offerings-left'>
                  <ul className='offerings-list'>
                    <li className='offerings-list-item'><i class="fa-solid fa-water list-icon"></i>Bay view</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-kitchen-set list-icon"></i>Kitchen</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-video list-icon"></i>Security cameras</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-hot-tub-person list-icon"></i>Private hot tub</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-jug-detergent list-icon"></i>{" "}Free washer – In unit</li>
                  </ul>
                </div>
                <div className='offerings-right'>
                  <ul className='offerings-list'>
                    <li className='offerings-list-item'><i class="fa-solid fa-umbrella-beach list-icon"></i>Beach view</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-wifi list-icon"></i>Wifi</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-car list-icon"></i>Free parking on premises</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-paw list-icon"></i>Pets allowed</li>
                    <li className='offerings-list-item'><i class="fa-solid fa-tv list-icon"></i>55" HDTV</li>
                  </ul>
                </div>
              </div>
              <button onClick={() => setShow404Modal(true)} className='offerings-button'>Show all 53 amenities</button>
            </div>
            <div className='single-spot-map'>
              <Map spot={singleSpot} />
            </div>
          </div>
          <div className='single-spot-lower-right'>
            <ReservationForm thisSpot={singleSpot} setShow404Modal={setShow404Modal} />
          </div>
        </div>
        <div className='review-index'>
          <ReviewIndex spot={singleSpot} />
        </div>
        <div>
          <p className='entire'>Things to know</p>
          <div className='things-to-know'>
            <div className='things-to-know-section'>
              <ul className='offerings-list'>
                <li className='offerings-list-header'>House rules</li>
                <li className='offerings-list-item'>Check-in 4:00 PM - 6:00 PM</li>
                <li className='offerings-list-item'>Checkout before 11:00 AM</li>
                <li className='offerings-list-item'>8 guests maximum</li>
                <li onClick={() => setShow404Modal(true)} className='offerings-list-item learn'>Show more</li>
              </ul>
            </div>
            <div className='things-to-know-section'>
              <ul className='offerings-list'>
                <li className='offerings-list-header'>Safety & property</li>
                <li className='offerings-list-item'>No carbon monoxide alarm</li>
                <li className='offerings-list-item'>No smoke alarm</li>
                <li className='offerings-list-item'>Pool/hot tub without a gate or lock</li>
                <li onClick={() => setShow404Modal(true)} className='offerings-list-item learn'>Show more</li>
              </ul>
            </div>
            <div className='things-to-know-section'>
              <ul className='offerings-list'>
                <li className='offerings-list-header'>Cancellation policy</li>
                <li className='offerings-list-item'>Cancel before 7 days for a partial refund</li>
                <li className='offerings-list-item'>Review the Host's full cancellation policy</li>
                <li className='offerings-list-item'>Restrictions may apply</li>
                <li onClick={() => setShow404Modal(true)} className='offerings-list-item learn'>Show more</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className='single-spot-footer'>
          Support
        </div> */}
      </div>
    </div>
  );
};

export default SingleSpot;
