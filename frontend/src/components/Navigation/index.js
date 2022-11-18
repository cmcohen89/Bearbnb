import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <nav className='nav'>
      <div className='nav-left'>
        <NavLink className='logo-link' exact to="/"><img className='logo-img' src='/images/logos/logo_5.png' alt='bearbnb logo'></img><span className='logo-text'>bearbnb</span></NavLink>
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
            <NavLink to='/coming-soon'><span><i class="fa-solid fa-magnifying-glass glass"></i></span></NavLink>
          </div>
        </div>
      </div>
      <div className='nav-right'>
        <span><NavLink className='host' to='/create'>Bearbnb your home</NavLink></span>
        <NavLink to='/coming-soon'><i class="fa-solid fa-globe globe"></i></NavLink>
        {isLoaded && <ProfileButton user={sessionUser} setLogin={setLogin} setShowModal={setShowModal} />}
        {showModal && <Modal onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
        </Modal>}
      </div>
    </nav>
  );
}

export default Navigation;
