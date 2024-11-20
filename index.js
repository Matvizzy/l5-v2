class Validator {
  constructor() {
    this.schema = {};
  }

  email() {
    const emailValidator = {
      isValid(value) {
        console.log('Email isValid check:', value);
        return typeof value === 'string' && value.includes('@');
      },
      setEmailLengthConstraint(minLength, maxLength) {
        this.isValid = (value) => {
          console.log('Email Length Constraint check:', value);
          const localPart = value.split('@')[0];
          if (minLength && localPart.length < minLength) {
            console.log(`Email length is less than ${minLength}`);
            return false;
          }
          if (maxLength && localPart.length > maxLength) {
            console.log(`Email length is greater than ${maxLength}`);
            return false;
          }
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
        console.log('Age isValid check:', value);
        return typeof value === 'number' && !Number.isNaN(value); // Используем Number.isNaN
      },
      isAdult() {
        this.isValid = (value) => {
          console.log('Age isAdult check:', value);
          return typeof value === 'number' && value >= 18;
        };
        return this;
      },
    };
    return ageValidator;
  }

  user() {
    const userValidator = {
      shape(fields) {
        this.schema = {...fields};
        return this;
      },
      isValid(user) {
        console.log('User isValid check:', user);
        const check = Object.keys(this.schema).map((key) => this.schema[key].isValid(user[key]));
        // const validator = this.schema[key];
        // if (!validator.isValid(user[key])) {
        //   console.log(`Validation failed for ${key} with value ${user[key]}`);
        //   return false;
        // }
        // return true;
        console.log(check);
        return !(check.includes(false));
        // for (const key of Object.keys(this.schema)) {
        //   const validator = this.schema[key];
        //   if (!validator.isValid(user[key])) {
        //     console.log(`Validation failed for ${key} with value ${user[key]}`);
        //     return false;
        //   }
        // }
        // return true;
      },
    };
    return userValidator;
  }
}
export default Validator;
