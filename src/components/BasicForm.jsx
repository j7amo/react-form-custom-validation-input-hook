/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import useInput from '../hooks/use-input';
import { validateEmail, validateText } from '../utils/utils';

function BasicForm() {
  const {
    value: firstName,
    isInputValid: isFirstNameValid,
    showError: showFirstNameError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(validateText);

  const {
    value: lastName,
    isInputValid: isLastNameValid,
    showError: showLastNameError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(validateText);

  const {
    value: email,
    isInputValid: isEmailValid,
    showError: showEmailError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid;

  const formSubmitHandler = (evt) => {
    evt.preventDefault();

    // technically we don't need it here but...
    // an experienced user can edit html via dev tools and make button enabled
    if (!isFormValid) {
      return;
    }

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div
          className={
            showFirstNameError ? 'form-control invalid' : 'form-control'
          }
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstName}
          />
          {showFirstNameError && (
            <p className="error-text">Name cannot be empty</p>
          )}
        </div>
        <div
          className={
            showLastNameError ? 'form-control invalid' : 'form-control'
          }
        >
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastName}
          />
          {showLastNameError && (
            <p className="error-text">Last name cannot be empty</p>
          )}
        </div>
      </div>
      <div className={showEmailError ? 'form-control invalid' : 'form-control'}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
        {showEmailError && <p className="error-text">Email must be valid</p>}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default BasicForm;
