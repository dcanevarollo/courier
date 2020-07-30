import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class FriendValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    friend_id: schema.string({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'users', column: 'id' }),
    ]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: '{{ field }} is required',
    'friend_id.uuid': 'Invalid uuid version',
    'friend_id.exists': 'Inexistent user',
  };
}
