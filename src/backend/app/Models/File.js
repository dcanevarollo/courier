/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

class File extends Model {
  static get visible() {
    return ['url'];
  }

  static get computed() {
    return ['url'];
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  message() {
    return this.belongsTo('App/Models/Message');
  }

  getUrl({ id }) {
    return `${Env.get('APP_EXT_URL')}/files/${id}`;
  }
}

module.exports = File;
