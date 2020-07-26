import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AlterMessagesAddColumns extends BaseSchema {
  protected tableName = 'messages';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('content').notNullable();
      table.timestamp('received_at');
      table.timestamp('read_at');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('content', 'received_at', 'read_at');
    });
  }
}
