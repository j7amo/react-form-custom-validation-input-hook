// because our CUSTOM hook expects a validating function we define 2 functions:
// 1) text input validation
export function validateText(text) {
  return text.trim().length !== 0;
}

// 2) email input validation
export function validateEmail(email) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
