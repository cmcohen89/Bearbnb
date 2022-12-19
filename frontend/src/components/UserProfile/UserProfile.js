import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import ComingSoon from '../ComingSoon/ComingSoon';
import MySpotsIndex from '../MySpotsIndex/MySpotsIndex';
import MyReviewsIndex from '../MyReviewsIndex/MyReviewsIndex';

const UserProfile = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='profile-page'>
            <div className='profile-pane'>

            </div>
            <div className='profile-content'>
                <MySpotsIndex />
                <MyReviewsIndex />
            </div>
        </div>
    )
}

export default UserProfile;
