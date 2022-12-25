import { useState } from 'react';

// we define a custom hook which helps us to extract duplicating logic
// p.s. to make it more flexible we expect a validation function here.
const useInput = (validate) => {
  // state is now managed inside this hook
  // we store (1)input value and (2)its setter
  const [value, setValue] = useState('');
  // we store (1)touched (if the input was visited) value and (2)its setter
  const [isTouched, setIsTouched] = useState(false);
  // we have data derived from state slices
  const isInputValid = validate(value);
  const showError = isTouched && !isInputValid;

  // handler to be called upon blur event
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // handler to be called upon change event
  const inputChangeHandler = (evt) => {
    setValue(evt.target.value);
  };

  // input reset function
  const reset = () => {
    setIsTouched(false);
    setValue('');
  };

  // and we return things that we'll use inside the component
  return {
    value,
    isInputValid,
    showError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
