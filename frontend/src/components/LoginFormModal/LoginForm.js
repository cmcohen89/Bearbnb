import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../LoginFormPage/LoginForm.css'
import './LoginFormModal.css'

function LoginForm({ setShowModal }) {
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

  return (
    <div className='modal'>
      <div className='top-bar'>
        <button className="x" onClick={() => setShowModal(false)}><i class="fa-solid fa-xmark"></i></button>
        <span>Log in</span>
        <span></span>
      </div>
      <h3 className='welcome'>Welcome to Bearbnb</h3>
      <div className='main-field'>
        <form className='form' onSubmit={handleSubmit}>
          {!!errors.length && <ul>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>}
          <input
            className='username'
            type="text"
            placeholder="Email address or username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            className="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='continue' type="submit">Continue</button>
        </form>
      </div>
      <div className='or'>
        <div className="line"></div>
        <span className='or_text'>or</span>
        <div className="line"></div>
      </div>
      <div className='widgets'>
        <button className='widget'>
          <i class="fa-brands fa-facebook fb"></i>
          <span>Continue with Facebook</span>
          <span></span>
        </button>
        <button className='widget'>
          <img className='google' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" />
          <span>Continue with Google</span>
          <span></span>
        </button>
        <button className='widget'>
          <i class="fa-brands fa-apple apple"></i>
          <span>Continue with Apple</span>
          <span></span>
        </button>
        <button className='widget'>
          <i class="fa-solid fa-mobile-retro phone"></i>
          <span>Continue with phone number</span>
          <span></span>
        </button>
      </div>
    </div >
  );
}

export default LoginForm;
