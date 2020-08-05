const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  /** @type {import('@adonisjs/validator/src/Validator')} */
  const Validator = use('Validator');

  /** @type {import('@adonisjs/lucid/src/Database')} */
  const Database = use('Database');

  /**
   * Function to validate a existent tuple in database before the payload be
   * passed to the controller itself.
   */
  const exists = async (data, field, message, args, get) => {
    const value = get(data, field);

    if (!value) return;

    const [table, column] = args;

    const row = await Database.table(table).where(column, value).first();

    if (!row) throw message;
  };

  Validator.extend('exists', exists);
});
