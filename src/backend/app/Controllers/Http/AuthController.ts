import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import slugify from 'App/Utils/Slugify';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { phone, password } = request.post();

    const phoneSlug = slugify(phone);

    const token = await auth
      .use('api')
      .attempt(phoneSlug, password, { expiresIn: '7 days' });

    const { user } = auth;

    await user?.preload((query) => {
      query.preload('conversations').preload('picture');
    });

    return response.accepted({ user, token });
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout();
  }
}
