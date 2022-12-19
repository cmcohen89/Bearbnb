import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, setLogin, setShowModal, setShowModal2, setShow404Modal }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            {user ?
                <button className='profile' onClick={openMenu}>
                    <span className='profile-lines'><i className="fa-solid fa-bars"></i></span>
                    <span className="profile-icon"><i className="fas fa-user-circle" /></span>
                </button>
                :
                <button className='no-profile' onClick={openMenu}>
                    <span className='no-profile-lines'><i className="fa-solid fa-bars"></i></span>
                </button>
            }
            {showMenu && (user ?
                (<ul className="profile-dropdown">
                    <div className="dropdown">
                        <li className='profile-dropdown-li dropdown-user'>{user.username}</li>
                        <li className='profile-dropdown-li dropdown-user'>{user.email}</li>
                    </div>
                    <div className="dropdown-line dropdown">
                        <li className='profile-dropdown-li dropdown-link'><a onClick={() => { setShowModal2(true) }}>Host Your Home</a></li>
                        <li className='profile-dropdown-li dropdown-link'><NavLink to='/my_spots'>My Spots</NavLink></li>
                        <li className='profile-dropdown-li dropdown-link'><NavLink to='/my_reviews'>My Reviews</NavLink></li>
                        <li className='profile-dropdown-li dropdown-link'>
                            <a onClick={logout}>Log Out</a>
                        </li>
                    </div>
                </ul>) :
                (<ul className="profile-dropdown">
                    <div className='dropdown'>
                        <li className="profile-dropdown-li profile-dropdown-login">
                            <a onClick={() => {
                                setLogin(true)
                                setShowModal(true)
                            }}>Log In</a>
                        </li>
                        <li className="profile-dropdown-li">
                            <a onClick={() => {
                                setLogin(false)
                                setShowModal(true)
                            }}>Sign Up</a>
                        </li>
                    </div>
                    <div className='dropdown-line dropdown'>
                        <li className="profile-dropdown-li dropdown-link">
                            <a onClick={() => {
                                setLogin(true)
                                setShowModal(true)
                            }}>Host your home</a>
                        </li>
                        <li className="profile-dropdown-li dropdown-link"><a onClick={() => setShow404Modal(true)}>Host an experience</a></li>
                        <li className="profile-dropdown-li dropdown-link"><a onClick={() => setShow404Modal(true)}>Help</a></li>
                    </div>
                </ul>)
            )}
        </>
    );
}

export default ProfileButton;
