/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.string('phone', 20).notNullable().unique();
      table.string('phone_slug', 20).notNullable().unique().index();
      table.string('password').notNullable();
      table.string('about');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UsersSchema;
