import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class AuthValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    dial_code: schema.string(),
    phone: schema.string(),
    password: schema.string(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: '{{ field }} is required',
  };
}
