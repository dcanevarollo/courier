class StoreUser {
  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      name: 'trim',
    };
  }

  get rules() {
    return {
      phone: 'required|string|unique:users,phone',
      name: 'required|string',
      password: 'required|string|min:6',
      about: 'string',
    };
  }

  get messages() {
    return {
      required: 'The {{ field }} is required to create a new account',
      'phone.unique': 'There is already a registered user with this phone',
      'password.min': 'Password must be, at least, {{ argument.0 }} characters',
    };
  }
}

module.exports = StoreUser;
