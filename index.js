class Validator {
  constructor() {
    this.schema = {};
  }
  email() {
    const emailValidator = {
      isValid(value) {
        return typeof value === 'string' && value.includes('@');
      },
      setEmailLengthConstraint(minLength, maxLength) {
        this.isValid = (value) => {
          const localPart = value.split('@')[0];
          if (minLength && localPart.length < minLength) return false;
          if (maxLength && localPart.length > maxLength) return false;
          return typeof value === 'string' && value.includes('@');
        };
        return this;
      },
    };
    return emailValidator;
  }
  age() {
    const ageValidator = {
      isValid(value) {
        return typeof value === 'number' && !isNaN(value);
      },
      isAdult() {
        this.isValid = (value) =>
          typeof value === 'number' && value >= 18;
        return this;
      },
    };
    return ageValidator;
  }
  user() {
    const userValidator = {
      shape(fields) {
        this.schema = fields;
        return this;
      },
      isValid(user) {
        for (const key in this.schema) {
          const validator = this.schema[key];
          if (!validator.isValid(user[key])) {
            return false;
          }
        }
        return true;
      },
    };
    return userValidator;
  }
}

export default Validator;
