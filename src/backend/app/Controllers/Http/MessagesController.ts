import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MessageValidator from 'App/Validators/MessageValidator';
import Message from 'App/Models/Message';

export default class MessagesController {
  public async index({ request, response }: HttpContextContract) {
    const { conversation_id: conversationId, page } = request.get();

    const messages = await Message.query()
      .preload('file')
      .preload('responseTo')
      .where({ conversation_id: conversationId })
      .orderBy('created_at')
      .paginate(page, 20);

    return response.json(messages);
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(MessageValidator);

    const { user } = auth;

    const conversationData = {
      senderId: user?.id,
      receiverId: data.receiver_id,
    };

    const conversation = await user
      ?.related('conversations')
      .firstOrCreate(conversationData, conversationData);

    // TODO : web socket implementation

    const message = await conversation?.related('messages').create({
      userId: user?.id,
      responseToId: data.response_to,
      content: data.content,
    });

    return response.created(message);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const message = await Message.findOrFail(id);

    await message.delete();

    return response.ok(null);
  }
}
