import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ReservationForm.css'

const ReservationForm = ({ thisSpot, setShow404Modal }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');

    const updateCheckIn = (e) => setCheckIn(e.target.value);
    const updateCheckOut = (e) => setCheckOut(e.target.value);
    const updateGuests = (e) => setGuests(e.target.value)

    const usDollar = Intl.NumberFormat("en-US");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            checkIn,
            checkOut,
            guests
        };

        console.log(payload)

        // const newBooking = await dispatch(createBooking(payload, thisSpot, user));
        // const spots = await dispatch(getSpots());
        // console.log(spots.Spots[id]);
        // if (newReview) history.push(`/spots/${id}`);
    };

    return (
        <div className='reservation-div'>
            <div className='reservation-top-bar'>
                <span><span className='reservation-price'>${usDollar.format(thisSpot.price)}</span> <span className='night'>night</span></span>
                <span className='reservation-rating-review'>
                    <i className="fa-solid fa-star"></i>{" "}
                    {thisSpot.avgStarRating !== 'NaN' ? thisSpot.avgStarRating : 'New'} · {" "}
                    <a className='reservation-hover' href='#reviews-link'>{thisSpot.numReviews} {thisSpot.numReviews === 1 ? 'review' : 'reviews'}</a>
                </span>
            </div>
            <div className='main-field'>
                <form className='reservation-form' onSubmit={handleSubmit}>
                    <div className='check-in-check-out'>
                        <div className='check-in-dropdown'>
                            <span>CHECK-IN</span>
                            <input
                                className='date'
                                type="date"
                                value={checkIn}
                                onChange={updateCheckIn}
                                required
                            />
                        </div>
                        <div className='check-out-dropdown'>
                            <span>CHECKOUT</span>
                            <input
                                className='date'
                                type="date"
                                value={checkOut}
                                onChange={updateCheckOut}
                                required
                            />
                        </div>
                    </div>
                    <input
                        className="guests-dropdown"
                        type="number"
                        min='1'
                        max='4'
                        placeholder="Guests"
                        value={guests}
                        onChange={updateGuests}
                        required
                    />
                    {/* <a className='plain-link-gray' onClick={() => setShow404Modal(true)}> */}
                    <button className='reserve' type="submit">Reserve</button>
                    {/* </a> */}
                    <p className='charged'>You won't be charged yet</p>
                    <div className='costs'>
                        <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>${usDollar.format(thisSpot.price)} x 7 nights</a>
                        <span>${usDollar.format(thisSpot.price * 7)}</span>
                    </div>
                    <div className='costs'>
                        <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>Cleaning fee</a>
                        <span>$17</span>
                    </div>
                    <div className='costs'>
                        <a className='plain-link-gray' onClick={() => setShow404Modal(true)}>Service fee</a>
                        <span>$120</span>
                    </div>
                    <span className='line2'></span>
                    <div className='reservation-total'>
                        <span>Total before taxes:</span>
                        <span>${usDollar.format((thisSpot.price * 7) + 137)}</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReservationForm;
