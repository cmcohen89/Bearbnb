import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleSpot } from '../../store/spots';
import ReservationForm from '../ReservationForm/ReservationForm';
import ReviewIndex from '../ReviewIndex/ReviewIndex';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let spots = useSelector(state => Object.values(state.spots));
  spots = spots.filter(spot => spot.SpotImages);
  const singleSpot = spots.find(spot => spot.id === +id);

  useEffect(() => {
    dispatch(getSingleSpot(id));
  }, [dispatch, id]);

  if (!singleSpot) return null;
  console.log(singleSpot)

  const previewImg = singleSpot.SpotImages.find(img => img.preview === true);
  const otherImgs = singleSpot.SpotImages.filter(img => img.preview === false).slice(0, 4);

  return (
    <div className='single-spot'>
      <h2 className='single-spot-title'>{singleSpot.name}</h2>
      <h3 className='single-spot-subtitle'>
        <div className='single-spot-subtitle-left'>
          <i class="fa-solid fa-star"></i>{" "}
          <span className='single-spot-avgRating'>{singleSpot.avgStarRating}</span> · <a>{singleSpot.numReviews} {singleSpot.numReviews === 1 ? 'Review' : 'Reviews'}</a> · <i class="fa-solid fa-medal medal2"></i> Superhost · <a>{singleSpot.city}</a>,<a>{singleSpot.state}</a>,<a>{singleSpot.country}</a>
        </div>
        <div className='single-spot-subtitle-right'>
          <span><i class="fa-solid fa-arrow-up-from-bracket arrow"></i><a>Share</a></span>
          <span><i class="fa-regular fa-heart heart"></i><a>Save</a></span>
        </div>
      </h3>
      <div className='img-div'>
        <img class='single-spot-img' src={previewImg.url} alt={singleSpot.name} />
        {otherImgs.map(img => (
          <img class='single-spot-img' src={img.url} alt={singleSpot.name} />
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
                <i class="fa-solid fa-medal medal"></i>
              </div>
              <div class='inner-li'>
                <p className='stat-header-item'>{singleSpot.Owner.firstName} is a Superhost</p>
                <span className='stat-item'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
              </div>
            </div>
            <div className='stat-li'>
              <div>
                <i class="fa-solid fa-key key"></i>
              </div>
              <div class='inner-li'>
                <p className='stat-header-item'>Great check-in experience</p>
                <span className='stat-item'>100% of recent guests gave the check-in process a 5-star rating.</span>
              </div>
            </div>
            <div className='stat-li'>
              <div>
                <i class="fa-regular fa-calendar calendar"></i>
              </div>
              <div class='inner-li'>
                <p className='stat-header-item'>Free cancellation for 48 hours</p>
              </div>
            </div>
          </div>
          <div className='single-spot-lower-left-section'>
            <img className='aircover' src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' />
            <p>Every booking includes free protection from Host cancellations, listing<br></br> inaccuracies, and other issues like trouble checking in.</p>
            <a className='learn'>Learn more</a>
          </div>
          <div className='single-spot-lower-left-section-final'>
            <p>{singleSpot.description}</p>
          </div>
        </div>
        <div className='single-spot-lower-right'>
          <ReservationForm thisSpot={singleSpot} />
        </div>
      </div>
      <div>
        <ReviewIndex spot={singleSpot} />
      </div>
    </div>
  );
};

export default SingleSpot;
