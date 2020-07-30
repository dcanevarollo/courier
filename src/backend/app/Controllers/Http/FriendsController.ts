import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FriendValidator from 'App/Validators/FriendValidator';

export default class FriendsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { friend_id: friendId } = await request.validate(FriendValidator);

    await auth.user?.related('friends').attach([friendId]);

    return response.created(null);
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const { id: friendId } = params;

    await auth.user?.related('friends').detach([friendId]);

    return response.ok(null);
  }
}
