class StoreMessage {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      conversation_id:
        'required_without_any:receiver_id|string|exists:conversations,id',
      receiver_id:
        'required_without_any:conversation_id|string|exists:users,id',
      response_to: 'string|exists:messages,id',
      content: 'required|string',
    };
  }

  get messages() {
    return {
      required: 'The {{ field }} is required to send a message',
      exists: 'The {{ field }} value must exist in database',
      required_without_any:
        'The {{ field }} is required if {{ argument.0 }} is not provided',
    };
  }
}

module.exports = StoreMessage;
