/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ConversationsSchema extends Schema {
  up() {
    this.create('conversations', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .uuid('sender_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('set null');
      table
        .uuid('receiver_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('set null');
      table.timestamps();
      table.unique(['sender_id', 'receiver_id']);
    });
  }

  down() {
    this.drop('conversations');
  }
}

module.exports = ConversationsSchema;
