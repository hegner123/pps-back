const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.hash = !isEmpty(data.hash) ? data.hash : "";

  // userName checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "UserName field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.hash)) {
    errors.hash = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
