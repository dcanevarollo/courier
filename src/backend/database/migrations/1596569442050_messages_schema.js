/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MessagesSchema extends Schema {
  up() {
    this.create('messages', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .uuid('conversation_id')
        .references('id')
        .inTable('conversations')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('set null');
      table
        .uuid('response_id')
        .references('id')
        .inTable('messages')
        .onUpdate('cascade')
        .onDelete('set null');
      table.text('content').notNullable();
      table.boolean('is_starred').defaultTo(false);
      table.timestamp('received_at');
      table.timestamp('read_at');
      table.timestamps();
    });
  }

  down() {
    this.drop('messages');
  }
}

module.exports = MessagesSchema;
