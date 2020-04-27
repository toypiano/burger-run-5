import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useImmer from '../../common/hooks/useImmer';
import { validateInputValue } from '../../common/validation/inputValidation';
import InputGroup from '../../common/ui/InputGroup';
import Button from '../../common/ui/Button';

const StyledAuth = styled.div`
  margin: 5em auto;
  width: 90%;
  max-width: var(--mw-modal);
  .auth__buttons {
    display: flex;
    flex-wrap: wrap;
    button {
      flex: 1 1 auto;
    }
  }
  .auth__error-message {
    text-align: center;
    width: 100%;
    padding: 2em;
    margin-top: 2em;
    background: rgba(0, 0, 0, 0.8);
    color: var(--cl-accent);
  }
`;

const initialState = {
  email: {
    inputType: 'input',
    config: {
      type: 'email',
      label: 'Email',
      placeholder: 'johndoe@youremail.com',
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    touched: false,
    valid: false,
  },
  password: {
    inputType: 'input',
    config: {
      type: 'text',
      label: 'Password',
      placeholder: 'Your Burger Builder password',
    },
    value: '',
    validation: {
      required: true,
      minLength: 6,
    },
    touched: false,
    valid: false,
  },
};

// Component
function Auth({ auth, error }) {
  const [controls, updateControls] = useImmer(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const allGood = Object.keys(controls).every((k) => controls[k].valid);
    setIsFormValid(allGood);
  }, [controls]);

  const handleInputChange = (e, k) => {
    const isValid = validateInputValue(e.target.value, controls[k].validation);
    updateControls((draft) => {
      draft[k].value = e.target.value;
      draft[k].valid = isValid;
      draft[k].touched = true;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    auth(controls.email.value, controls.password.value, isSignIn);
  };

  const handleSwitchAuthMode = () => {
    setIsSignIn((bool) => !bool);
  };

  const inputControls = Object.entries(controls).map(([k, v]) => (
    <InputGroup
      key={k}
      inputType={v.inputType}
      config={v.config}
      valid={v.valid}
      onChange={(e) => handleInputChange(e, k)}
      touched={v.touched}
      value={v.value}
    />
  ));

  return (
    <StyledAuth>
      <form onSubmit={handleFormSubmit}>
        {inputControls}
        <div className="auth__buttons">
          <Button variant="success" disabled={!isFormValid}>
            {isSignIn ? 'SIGN IN' : 'SIGN UP'}
          </Button>
          <Button
            type="button"
            variant="outline-success"
            onClick={handleSwitchAuthMode}
          >
            SWITCH TO {isSignIn ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </div>
        {error && (
          <div className="auth__error-message">
            <p>
              {error.code} Error: {error.message}
            </p>
          </div>
        )}
      </form>
    </StyledAuth>
  );
}

export default Auth;
