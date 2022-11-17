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
      {user ?
        <button class='profile' onClick={openMenu}>
          <span className='profile-lines'><i class="fa-solid fa-bars"></i></span>
          <span className="profile-icon"><i className="fas fa-user-circle" /></span>
        </button>
        :
        <button class='no-profile' onClick={openMenu}>
          <span className='no-profile-lines'><i class="fa-solid fa-bars"></i></span>
        </button>
      }
      {showMenu && (user ?
        (<ul className="profile-dropdown">
          <div className="dropdown">
            <li className='profile-dropdown-li dropdown-user'>{user.username}</li>
            <li className='profile-dropdown-li dropdown-user'>{user.email}</li>
          </div>
          <div className="dropdown-line dropdown">
            <li className='profile-dropdown-li dropdown-link'><NavLink to='/my_spots'>My Spots</NavLink></li>
            <li className='profile-dropdown-li dropdown-link'><NavLink to='/my_reviews'>My Reviews</NavLink></li>
            <li className='profile-dropdown-li dropdown-link'>
              <a onClick={logout}>Log Out</a>
            </li>
          </div>
        </ul>) :
        (<ul className="profile-dropdown">
          <div className='dropdown'>
            <li className="profile-dropdown-li">
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
              <NavLink to='/create'>Host your home</NavLink>
            </li>
            <li className="profile-dropdown-li dropdown-link"><NavLink to='/coming-soon'>Host an experience</NavLink></li>
            <li className="profile-dropdown-li dropdown-link"><NavLink to='/coming-soon'>Help</NavLink></li>
          </div>
        </ul>)
      )}
    </>
  );
}

export default ProfileButton;
