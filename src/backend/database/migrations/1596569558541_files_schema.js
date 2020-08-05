/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FilesSchema extends Schema {
  up() {
    this.create('files', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('message_id')
        .references('id')
        .inTable('messages')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('files');
  }
}

module.exports = FilesSchema;
