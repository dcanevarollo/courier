import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {
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

    return response.created(message?.id);
  }
}
