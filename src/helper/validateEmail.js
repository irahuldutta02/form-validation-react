// email validation
export function validateEmail(email) {
  const emailRegex = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/;

  if (emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
}
