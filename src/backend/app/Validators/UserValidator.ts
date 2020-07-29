import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string({}, [
      rules.unique({ table: 'users', column: 'phone' }),
    ]),
    name: schema.string({ trim: true }),
    password: schema.string({}, [rules.minLength(6)]),
    about: schema.string.optional(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: '{{ field }} is required',
    'phone.unique': 'User with this phone number already registered',
    'password.minLength': 'The password must contain at leat 6 characters',
  };
}
