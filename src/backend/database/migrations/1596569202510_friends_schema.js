/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FriendsSchema extends Schema {
  up() {
    this.create('friends', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('friend_id')
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.unique(['user_id', 'friend_id']);
    });
  }

  down() {
    this.drop('friends');
  }
}

module.exports = FriendsSchema;
