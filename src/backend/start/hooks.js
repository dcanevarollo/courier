const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  /** @type {import('@adonisjs/validator/src/Validator')} */
  const Validator = use('Validator');

  /** @type {import('../app/Utils/Exists')} */
  const exists = use('App/Utils/Exists');

  Validator.extend('exists', exists);
});
