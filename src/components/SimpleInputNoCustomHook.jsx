/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function SimpleInput() {
  // if we go with useRef approach we can still get the value of the input
  // BUT avoid component re-rendering. But this is not a recommended use-case by React.
  // One of drawbacks of using refs:
  // When we want to clear the input after form submission we have to manipulate DOM directly
  // by using inputRef.current.value = '' which is typically not a good way of doing things.
  // We should manipulate DOM directly (imperative approach) when we don't have a way of doing it
  // declarative way.
  // const nameRef = useRef();

  // So for this project we'll use useState approach.
  // We'll use controlled components approach despite component re-evaluations on each state update
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // setting 'isInputNameValid' to 'true' is kind of cheating:
  // we don't want to show errors when the app just loaded, but technically
  // the input is NOT correct because it is obviously EMPTY. So we SHOULD NOT set this to 'true'
  // by default. And what's even more interesting: we DON'T really NEED this state!
  // const [isInputNameValid, setIsInputNameValid] = useState(false);
  // Instead, we must use 'wasTouched' approach:
  // we make this state slice to indicate if the user interacted with the input
  const [isInputNameTouched, setIsInputNameTouched] = useState(false);
  const [isInputEmailTouched, setIsInputEmailTouched] = useState(false);
  // We can use DERIVED state because to evaluate validity of the input we need ONLY:
  // - entered value;
  // - touched state of the input;
  const isInputNameValid = name.trim().length !== 0;
  const isInputEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
    email,
  );
  // we also define a separate flag for applying css styling for invalid state.
  // pay attention that this is not the same as 'isInputNameValid' because we
  // also need to take 'touched' state into consideration.
  // This flag helps us to give user the feedback if the input is OK or NOT
  const shouldApplyStylingForInvalidNameState = isInputNameTouched && !isInputNameValid;
  const shouldApplyStylingForInvalidEmailState = isInputEmailTouched && !isInputEmailValid;

  // but what if we have more than 1 input?
  // Let's say we have 10 inputs.
  // In this case it is good to know if the form is valid overall.
  // And for the form to be INVALID it is enough when even one input is INVALID.
  // So we can have a separate state for this and maybe use it to disable the submit button.
  // =====================================================
  // IMPORTANT!!! It's one of possible approaches BUT key takeaway here is that we
  // should always ask ourselves these questions:
  // DO WE REALLY NEED A STATE SLICE TO MAKE SOME VALUE PERSIST BETWEEN RENDERS?
  // CAN WE DERIVE THIS VALUE (DATA) FROM SOME OTHER STATE SLICE?
  // const [isFormValid, setIsFormValid] = useState(false);
  // =====================================================

  // here we have some validation for the case when user interacted with the input
  // but didn't enter any value or decided to delete what he entered.
  // We should give the user feedback that this is invalid input! Because giving this feedback
  // on submission might be too late (user was hoping to submit the form but had to return
  // to some invalid inputs and correct them which might be frustrating).
  const nameInputBlurHandler = () => {
    // because user interacted with the input we should set TOUCHED state to true
    setIsInputNameTouched(true);
  };

  const emailInputBlurHandler = () => {
    setIsInputEmailTouched(true);
  };

  // we can also give realtime feedback which is the quickest way
  // of letting user know if the input is OK or NOT.
  const nameInputChangeHandler = (evt) => {
    setName(evt.target.value);
  };

  const emailInputChangeHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    // we must set 'touched' state of ALL the form inputs to TRUE right before submission
    // because user was supposed to interact with all of them in order to successfully submit.
    // This is helpful when user loaded the page and just clicked 'Submit' without
    // even touching any inputs.
    setIsInputNameTouched(true);
    setIsInputEmailTouched(true);

    // here we have some client-side validation to improve user experience,
    // BUT we should always do the final validation ON THE SERVER SIDE!
    // Why so? Because if the user is experienced enough he can open dev tools
    // and edit JS code on-the-fly to change validation logic and as a result
    // he will be able to submit invalid (and possibly harmful) input.
    if (!isInputNameValid || !isInputEmailValid) {
      return;
    }

    // on SUCCESSFUL validation we:
    // 1) do some logic of passing the data to some parent component via callback from props
    // or maybe making a POST request.
    // ...some logic here...
    // 2) reset the form to the initial state:
    setIsInputNameTouched(false);
    setIsInputEmailTouched(false);
    setName('');
    setEmail('');
  };

  const classForInvalidNameInput = shouldApplyStylingForInvalidNameState
    ? 'form-control invalid'
    : 'form-control';

  const classForInvalidEmailInput = shouldApplyStylingForInvalidEmailState
    ? 'form-control invalid'
    : 'form-control';

  // we can use useEffect hook to update the overall validity of the form:
  // 1) we put all the separate inputs validity inside dependency array to trigger the effect
  // 2) we conditionally set overall form validity
  // And it will work.
  // But there's no point in useEffect here because we are already
  // using DATA DERIVED FROM STATE.
  // At every component evaluation (we are talking about the process when
  // React calls/invokes our functional component):
  // - 'name' state has the latest value;
  // - which leads to 'isInputNameValid' variable having the latest value too (it's derived);
  // - which in turn leads to a call of 'setIsFormValid' with correct argument;
  // useEffect(() => {
  //   if (isInputNameValid) {
  //     setIsFormValid(true);
  //   } else {
  //     setIsFormValid(false);
  //   }
  // }, [isInputNameValid]);

  // so instead of using useEffect we can just do this:
  let formIsValid = false;
  // which is even more simple, and we can get rid of 'isFormValid' state slice
  // because we can use derived data (i.e. validity of each and every input).
  // here we add every input validity we have to IF statement
  // to decide if the form is overall valid.
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
        {shouldApplyStylingForInvalidNameState && (
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
        {shouldApplyStylingForInvalidEmailState && (
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
