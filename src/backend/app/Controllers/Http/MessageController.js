/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');

/** @type {import('@adonisjs/websocket/src/Ws')} */
const Ws = use('Ws');

/** @type {typeof import('../../Models/Message')} */
const Message = use('App/Models/Message');

/** @type {typeof import('../../Models/Conversation')} */
const Conversation = use('App/Models/Conversation');

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {
  /**
   * Show a list of messages of a conversation.
   * GET messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const query = request.get();

    const messages = await Message.query()
      .with('file')
      .with('response', (responseQuery) => {
        responseQuery.setVisible(['id']);
      })
      .where({ conversation_id: query.conversation_id })
      .orderBy('created_at')
      .paginate(query.page, 20);

    return response.json(messages);
  }

  /**
   * Create/save a new message.
   * POST messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    const data = request.post();

    const user = await auth.getUser();

    const transaction = await Database.beginTransaction();

    let conversation = await Conversation.find(data.conversation_id);

    if (!conversation)
      conversation = await Conversation.create(
        {
          sender_id: user?.id,
          receiver_id: data.receiver_id,
        },
        transaction
      );

    const message = await conversation?.messages().create(
      {
        user_id: user?.id,
        response_id: data.response_to,
        content: data.content,
      },
      transaction
    );

    const chatChannel = Ws.getChannel('chat');

    if (chatChannel) chatChannel.sendMessage(message);

    await transaction.commit();

    await transaction.rollback();

    return response.json(message);
  }

  /**
   * Delete a message with id.
   * DELETE messages/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params;

    const message = await Message.findOrFail(id);

    await message.delete();

    return response.send();
  }
}

module.exports = MessageController;
