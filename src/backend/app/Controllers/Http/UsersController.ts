import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import User from 'App/Models/User';
import slugify from 'App/Utils/Slugify';

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator);

    const { dial_code: dial } = request.post();

    data.phone = `${dial} ${data.phone}`;

    const phoneSlug = slugify(data.phone);

    const user = await User.create({ ...data, phoneSlug });

    response.created(user.id);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const user = await User.findOrFail(id);

    await user.preload('picture');

    return response.json(user);
  }
}
