import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import slugify from 'App/Utils/Slugify';
import AuthValidator from 'App/Validators/AuthValidator';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(AuthValidator);

    const phoneSlug = slugify(data.dial_code + data.phone);

    const token = await auth.attempt(phoneSlug, data.password, {
      expiresIn: '7 days',
    });

    const { user } = auth;

    await user?.preload((query) => {
      query
        .preload('conversations', (conversation) =>
          conversation.preload('receiver'),
        )
        .preload('picture');
    });

    return response.accepted({ user, token });
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout();
  }
}
