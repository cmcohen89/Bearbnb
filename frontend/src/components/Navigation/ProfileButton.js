import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
  };

  return (
    <>
      <button class='profile' onClick={openMenu}>
        <span className='profile-lines'><i class="fa-solid fa-bars"></i></span>
        <span className="profile-icon"><i className="fas fa-user-circle" /></span>
      </button>
      {showMenu && (user ?
        (<ul className="profile-dropdown">
          <li className='profile-dropdown-li'>{user.username}</li>
          <li className='profile-dropdown-li'>{user.email}</li>
          <li className='profile-dropdown-li'><NavLink to='/my_spots'>My Spots</NavLink></li>
          <li className='profile-dropdown-li'><NavLink to='/my_reviews'>My Reviews</NavLink></li>
          <li className='profile-dropdown-li'>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>) :
        (<ul className="profile-dropdown">
          <div className='dropdown'>
            <li className="profile-dropdown-li">
              <a onClick={() => {
                console.log();
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
            <li className="profile-dropdown-li"><a>Host your home</a></li>
            <li className="profile-dropdown-li"><a>Host an experience</a></li>
            <li className="profile-dropdown-li"><a>Help</a></li>
          </div>
        </ul>)
      )}
    </>
  );
}

export default ProfileButton;
