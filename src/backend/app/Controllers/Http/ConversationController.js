/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {typeof import('../../Models/Conversation')} */
const Conversation = use('App/Models/Conversation');

/**
 * Resourceful controller for interacting with conversations
 */
class ConversationController {
  /**
   * Show a list of all conversations of the authenticated user.
   * GET conversations
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({ response, auth }) {
    const user = await auth.getUser();

    const conversations = await user
      ?.conversations()
      .with('receiver', (receiverQuery) => receiverQuery.with('picture'))
      .with('sender', (senderQuery) => senderQuery.with('picture'))
      .fetch();

    const serializedConversations = conversations.toJSON();

    // Only returns the another user info
    serializedConversations.forEach((conversation) => {
      const { receiver, sender } = conversation;

      if (receiver.id === user?.id) conversation.user = sender;
      else conversation.user = receiver;

      delete conversation.receiver;
      delete conversation.sender;
    });

    return response.json(serializedConversations);
  }

  /**
   * Delete a conversation with id.
   * DELETE conversations/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params;

    const conversation = await Conversation.findOrFail(id);

    await conversation.delete();

    return response.send();
  }
}

module.exports = ConversationController;
