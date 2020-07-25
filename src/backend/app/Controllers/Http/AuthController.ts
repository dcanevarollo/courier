import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import slugify from 'App/Utils/Slugify';

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const { phone, password } = request.post();

    const phoneSlug = slugify(phone);
    console.log(phoneSlug);

    const token = await auth.use('api').attempt(phoneSlug, password);

    return token.toJSON();
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout();
  }
}
