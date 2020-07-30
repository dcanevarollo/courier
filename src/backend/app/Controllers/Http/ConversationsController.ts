import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Conversation from 'App/Models/Conversation';

export default class ConversationsController {
  public async index({ response, auth }: HttpContextContract) {
    const conversations = await auth.user
      ?.related('conversations')
      .query()
      .preload('receiver', (receiverQuery) => receiverQuery.preload('picture'))
      .preload('messages', (messageQuery) =>
        messageQuery
          .preload('file')
          .preload('responseTo')
          .orderBy('created_at')
          .limit(10),
      );

    return response.json(conversations);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const conversation = await Conversation.findOrFail(id);

    await conversation.delete();

    return response.ok(null);
  }
}
