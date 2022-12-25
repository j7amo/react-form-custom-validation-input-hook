/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import useInput from '../hooks/use-input';
import { validateEmail, validateText } from '../utils/utils';

// =======================
// IMPORTANT!!!
// THERE IS ANOTHER FILE (SimpleInputNoCustomHook.jsx) WHICH HAS USEFUL INFORMATION
// =======================
function SimpleInput() {
  const {
    value: name,
    isInputValid: isInputNameValid,
    showError: nameInputHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput(validateText);

  const {
    value: email,
    isInputValid: isInputEmailValid,
    showError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    // on SUCCESSFUL validation we:
    // 1) do some logic of passing the data to some parent component via callback from props
    // or maybe making a POST request.
    // ...some logic here...
    // 2) reset the form to the initial state:
    resetName();
    resetEmail();
  };

  const classForInvalidNameInput = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const classForInvalidEmailInput = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  let formIsValid = false;

  if (isInputNameValid && isInputEmailValid) {
    formIsValid = true;
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classForInvalidNameInput}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={classForInvalidEmailInput}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Email must be correct and not empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default SimpleInput;
