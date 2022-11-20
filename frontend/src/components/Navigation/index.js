import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';
import CreateSpotForm from '../CreateSpotForm/CreateSpotForm';
import ComingSoon from '../ComingSoon/ComingSoon';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [show404Modal, setShow404Modal] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <nav className='nav'>
      <div className='nav-left'>
        <NavLink className='logo-link' exact to="/">
          <img className='logo-img' src='/images/logos/logo_5.png' alt='bearbnb logo'></img><span className='logo-text'>bearbnb</span>
        </NavLink>
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
            <span onClick={() => setShow404Modal(true)}><i className="fa-solid fa-magnifying-glass glass"></i></span>
            {show404Modal && <Modal onClose={() => setShow404Modal(false)}>
              <ComingSoon setShow404Modal={setShow404Modal} />
            </Modal>}
          </div>
        </div>
      </div>
      <div className='nav-right'>
        {sessionUser ? <button className='host' onClick={() => setShowModal2(true)}>Bearbnb your home</button> :
          <button className='host' onClick={() => setShowModal(true)}>Bearbnb your home</button>}
        {showModal2 && <Modal onClose={() => setShowModal2(false)}><CreateSpotForm setShowModal2={setShowModal2} /></Modal>}
        <i onClick={() => setShow404Modal(true)} className="fa-solid fa-globe globe"></i>
        {show404Modal && <Modal onClose={() => setShow404Modal(false)}>
          <ComingSoon setShow404Modal={setShow404Modal} />
        </Modal>}
        {isLoaded &&
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
            setShowModal2={setShowModal2}
            setShow404Modal={setShow404Modal}
          />}
        {showModal && <Modal onClose={() => setShowModal(false)}>
          {login ?
            <LoginForm setShowModal={setShowModal} setShow404Modal={setShow404Modal} /> :
            <SignupFormPage setShowModal={setShowModal} setShow404Modal={setShow404Modal} />}
        </Modal>}
      </div>
    </nav>
  );
}

export default Navigation;
