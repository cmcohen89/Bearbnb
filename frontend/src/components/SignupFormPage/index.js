import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage({ setShowModal, setShow404Modal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='modal2'>
      <div className='top-bar'>
        <button className="x" onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"></i></button>
        <span>Sign up</span>
        <span></span>
      </div>
      <h3 className='welcome'>Welcome to Bearbnb</h3>
      <div className='main-field'>
        <form className='form' onSubmit={handleSubmit}>
          <ul className='errors-ul'>
            {errors.map((error, idx) => (
              <li className='errors' key={idx}>{error}</li>
            ))}
          </ul>
          <input
            className='email input'
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='username2 input'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="password2 input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="confirm_password input"
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            className="firstName input"
            placeholder="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="lastName input"
            placeholder="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

export default SignupFormPage;
