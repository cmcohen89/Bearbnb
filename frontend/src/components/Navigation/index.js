import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink className='host' to="/create">Become A Host</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='host' to="/create">Become A Host</NavLink>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav>
      <div className='nav-left'>
        <NavLink className='logo-link' exact to="/"><img className='logo-img' src='/images/logos/bearbnb_logo_2_bold.png' alt='bearbnb logo'></img><span className='logo-text'>bearbnb</span></NavLink>
      </div>
      <div className='nav-center'>
        <div className="bar">
          <div className="location">
            <input className='anywhere' type="text" placeholder="Anywhere" />
          </div>
          <div className="check-in">
            <input className='any-week' type="text" placeholder="Any week" />
          </div>
          <div className="guests">
            <input className='add-guests' type="text" placeholder="Add guests" />
            <span><i class="fa-solid fa-magnifying-glass"></i></span>
          </div>
        </div>
      </div>
      <div className='nav-right'>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
