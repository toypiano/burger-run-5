/**
 * @function validateInputValue check if passed value validates against all rules
 * @param {string} value value to validate
 * @param {Object} rules Object containing validation rules
 * @returns {boolean} true if passes
 */
export const validateInputValue = (value, rules) => {
  let isValid = true;
  if (!rules) return;
  if (rules.required) {
    isValid = isValid && value.trim() !== '';
  }
  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength;
  }
  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength;
  }
  if (rules.isNumeric) {
    const re = /^\d+$/;
    isValid = isValid && re.test(value);
  }
  if (rules.isEmail) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = isValid && re.test(value);
  }

  return isValid;
};
