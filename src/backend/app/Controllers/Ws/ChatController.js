/** @typedef {import('@adonisjs/websocket/src/Socket')} Socket */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

class ChatController {
  /**
   *
   * @param {object} ctx
   * @param {Socket} ctx.socket
   * @param {Auth} ctx.auth
   */
  constructor({ socket, auth }) {
    this.socket = socket;
    this.connections[auth.user?.id] = socket.id;
  }

  sendMessage(message) {
    const receiverSocket = this.connections[message.receiver.id];

    this.socket.emitTo('new_message', message, [receiverSocket]);
  }

  onError() {
    Logger.notice('error with socket %s', this.socket.id);
  }
}

module.exports = ChatController;
