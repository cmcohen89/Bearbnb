import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

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
        <span><NavLink className='host' to='/create'>Become a Host</NavLink></span>
        <i class="fa-solid fa-globe globe"></i>
        {isLoaded && <ProfileButton user={sessionUser} setLogin={setLogin} setShowModal={setShowModal} />}
        {showModal && <Modal onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
        </Modal>}
      </div>
    </nav>
  );
}

export default Navigation;
