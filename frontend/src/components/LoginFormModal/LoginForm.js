import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../LoginFormPage/LoginForm.css'
import './LoginFormModal.css'
import { NavLink } from "react-router-dom";

function LoginForm({ setShowModal, setShow404Modal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(() => setShowModal(false));
  }

  return (
    <div className='modal'>
      <div className='top-bar'>
        <button className="x" onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"></i></button>
        <span>Log in</span>
        <span></span>
      </div>
      <h3 className='welcome'>Welcome to Bearbnb</h3>
      <div className='main-field'>
        <form className='form' onSubmit={handleSubmit}>
          {!!errors.length && <ul className='errors-ul'>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>}
          <input
            className='username input'
            type="text"
            placeholder="Email address or username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            className="password input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='continue' type="submit">Continue</button>
          <button onClick={handleDemo} className='demo-button'>Log in as Demo User</button>
        </form>
      </div>
      <div className='or'>
        <div className="line"></div>
        <span className='or_text'>or</span>
        <div className="line"></div>
      </div>
      <div className='widgets'>
        <a><button onClick={() => setShow404Modal(true)} className='widget'>
          <i className="fa-brands fa-facebook fb"></i>
          <span>Continue with Facebook</span>
          <span></span>
        </button></a>
        <a><button onClick={() => setShow404Modal(true)} className='widget'>
          <img className='google' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
          <span>Continue with Google</span>
          <span></span>
        </button></a>
        <a><button onClick={() => setShow404Modal(true)} className='widget'>
          <i className="fa-brands fa-apple apple"></i>
          <span>Continue with Apple</span>
          <span></span>
        </button></a>
        <a><button onClick={() => setShow404Modal(true)} className='widget'>
          <i className="fa-solid fa-mobile-retro phone"></i>
          <span>Continue with phone number</span>
          <span></span>
        </button></a>
      </div>
    </div>
  );
}

export default LoginForm;
