/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Conversation extends Model {
  static get visible() {
    return [];
  }

  sender() {
    return this.belongsTo('App/Models/User', 'sender_id');
  }

  receiver() {
    return this.belongsTo('App/Models/User', 'receiver_id');
  }

  messages() {
    return this.hasMany('App/Models/Message');
  }
}

module.exports = Conversation;
