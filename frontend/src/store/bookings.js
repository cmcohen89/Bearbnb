import { csrfFetch } from "./csrf";

const LOAD_SPOT_BOOKINGS = 'bookings/LOAD_SPOT_BOOKINGS';
const LOAD_USER_BOOKINGS = 'bookings/LOAD_USER_BOOKINGS';

export const loadSpotBookings = (bookings) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    };
};

export const loadUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

export const getSpotBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadSpotBookings(bookings));
        return bookings;
    };
};

export const getUserBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadUserBookings(bookings));
        return bookings;
    }
}

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_SPOT_BOOKINGS:
            const spotBookings = action.bookings.Bookings.reduce((bookings, booking) => {
                bookings[booking.id] = booking;
                return bookings;
            }, {});
            newState.spotBookings = spotBookings;
            return newState;
        case LOAD_USER_BOOKINGS:
            const userBookings = action.bookings.Bookings.reduce((bookings, booking) => {
                bookings[booking.id] = booking;
                return bookings;
            }, {});
            newState.userBookings = userBookings;
            return newState;
        default:
            return state;
    };
};

export default bookingsReducer;
