import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.message) setErrors([data.message]);
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <div className="modal-header">
      <h1>Sign Up</h1>
    </div>
      <div className="modal-body-container">
        <form className="modal-body" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className="modal-label">
            <input
            className="modal-top-input"
              type="email"
              value={email}
              maxLength={50}
              placeholder={'Email'}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            <input
              className="modal-input"
              type="text"
              minLength={3}
              maxLength={30}
              placeholder={'UserName'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            <input
              className="modal-input"
              type="text"
              minLength={3}
              maxLength={20}
              placeholder={'First Name'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            <input
              className="modal-input"
              type="text"
              minLength={3}
              placeholder={'Last Name'}
              maxLength={20}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            <input
              className="modal-input"
              type="password"
              placeholder={'password'}
              value={password}
              maxLength={50}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            <input
              className="modal-bottom-input"
              type="password"
              placeholder={'Confirm Password'}
              maxLength={50}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="submit clickable" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
