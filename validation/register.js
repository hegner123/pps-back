const Validator from "validator");
const isEmpty from "is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.hash = !isEmpty(data.hash) ? data.hash : "";

  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "Name field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  }

  // Password checks
  if (Validator.isEmpty(data.hash)) {
    errors.hash = "Password field is required";
  }

  // if (!Validator.isLength(data.hash, { min: 6, max: 30 })) {
  //   errors.hash = "Password must be at least 6 characters";
  // };

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
