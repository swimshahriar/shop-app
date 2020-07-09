import React, { useState, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorText, setErrorText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isLoginMode) {
      try {
        const response = await fetch('http://localhost:8000/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
        setIsLoading(false);

        if (!response.ok) {
          throw new Error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorText(true);
        return new Error(error);
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);

        setIsLoading(false);
        if (!response.ok) {
          throw new Error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorText(true);
        return error;
      }
    }

    auth.login();
  };

  return (
    <Card className="auth">
      <h2>{isLoginMode ? 'Login' : 'SignUp'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        {isLoading ? (
          <div className="center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Button
            type="submit"
            className="center"
            disabled={!formState.isValid}
          >
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        )}
      </form>
      {!isLoading && (
        <div className="switch-btn">
          <Button className="center" onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </div>
      )}
      
      {errorText && (
        <div className="center errorText">
          <p>Something is wrong!</p>
        </div>
      )}
    </Card>
  );
};

export default Auth;
