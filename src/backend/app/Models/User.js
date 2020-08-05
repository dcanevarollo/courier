/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', 'UserHook.hashPassword');
  }

  static get hidden() {
    return ['password', 'created_at', 'updated_at', 'phone_slug'];
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  picture() {
    return this.hasOne('App/Models/File');
  }

  conversations() {
    return this.hasMany('App/Models/Conversation', 'id', 'sender_id');
  }

  friends() {
    return this.belongsToMany(
      'App/Models/User',
      'user_id',
      'friend_id'
    ).pivotTable('friends');
  }
}

module.exports = User;
