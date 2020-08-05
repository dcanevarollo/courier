/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ExtensionsSchema extends Schema {
  up() {
    this.createExtensionIfNotExists('uuid-ossp');
  }

  down() {
    this.dropExtensionIfExists('uuid-ossp');
  }
}

module.exports = ExtensionsSchema;
