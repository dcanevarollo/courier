import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class MessageValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    receiver_id: schema.string({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    response_to: schema.string.optional({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'messages', column: 'id' }),
    ]),
    content: schema.string(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: '{{ field }} is required',
    uuid: '{{ field }} must contain a valid version 4 uuid',
    exists: '{{ field }} must exist to association be done',
  };
}
