import React, { useState } from 'react';

import Header from '../../Shared/Components/Header/Header';
import FormInput from '../../Shared/Components/UIElements/FormInput';
import Button from '../../Shared/Components/UIElements/Button';
import AuthImg from '../../assets/images/auth.png';
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passHandler = (event) => {
    setPass(event.target.value);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <Header />

      <form className="form">
        <div className="auth__container">
          <img className="auth__img" src={AuthImg} alt="authImg" />
        </div>
        {isSignup && (
          <FormInput
            type="text"
            placeholder="name"
            value={name}
            onChange={nameHandler}
            size="35"
          />
        )}
        <FormInput
          type="email"
          placeholder="email"
          value={email}
          onChange={emailHandler}
          size="35"
        />
        <FormInput
          type="password"
          placeholder="password"
          value={pass}
          onChange={passHandler}
          size="35"
        />
        {isSignup ? (
          <Button type="submit" name="Signup" />
        ) : (
          <Button type="submit" name="Login" />
        )}
        {!isSignup ? (
          <div className="auth__signup">
            <p className="auth__signup-text">Not have an account?</p>
            <button
              className="auth__signup-btn"
              onClick={(event) => {
                event.preventDefault();
                setIsSignup(true);
              }}
            >
              Signup
            </button>
          </div>
        ) : (
          <div className="auth__signup">
            <p className="auth__signup-text">Already have an account?</p>
            <button
              className="auth__signup-btn"
              onClick={(event) => {
                event.preventDefault();
                setIsSignup(false);
              }}
            >
              Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;
