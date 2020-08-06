class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }
}

module.exports = ChatController;
