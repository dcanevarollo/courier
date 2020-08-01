/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
*/

import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    switch (error.code) {
      case 'E_INVALID_AUTH_UID':
        return ctx.response.badRequest('Invalid credentials. Try again!');
      case 'E_INVALID_AUTH_PASSWORD':
        return ctx.response.badRequest('Invalid credentials. Try again!');
    }

    return super.handle(error, ctx);
  }
}
