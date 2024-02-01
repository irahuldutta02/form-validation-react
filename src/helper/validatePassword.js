// password should be at least 8 characters long + contain at least 1 number + 1 special character + 1 uppercase letter + 1 lowercase letter
export function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // example password: Abcd@1234
  if (passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
}
