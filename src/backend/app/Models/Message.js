/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Message extends Model {
  static get hidden() {
    return ['conversation_id', 'response_to', 'updated_at'];
  }

  static get dates() {
    return super.dates.concat(['received_at', 'read_at']);
  }

  static castDates(field, value) {
    if (field === 'created_at') return value.format('HH:mm');

    return super.formatDates(field, value);
  }

  conversation() {
    return this.belongsTo('App/Models/Conversation');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  response() {
    return this.hasOne('App/Models/Message', 'id', 'response_id');
  }

  file() {
    return this.hasOne('App/Models/File');
  }
}

module.exports = Message;
