/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Exception')} Exception */

const BaseExceptionHandler = use('BaseExceptionHandler');

/** @type {import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Exception} error
   * @param  {Response} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    let message;
    let errors;

    switch (error.status) {
      case 400: {
        if (error.code === 'E_VALIDATION_FAILED') errors = error.messages;

        message = 'Fill error. Please, try again';
        break;
      }
      case 401: {
        message = 'Ops! Wrong credentials...';
        break;
      }
      case 403: {
        message = 'You do not have access to this resource';
        break;
      }
      case 404: {
        message = 'We could not find this resource';
        break;
      }
      default: {
        message = 'Internal error. Please, contact the developer';

        Logger.error(error.stack);
        break;
      }
    }

    return response.status(error.status).json({ message, errors });
  }
}

module.exports = ExceptionHandler;
