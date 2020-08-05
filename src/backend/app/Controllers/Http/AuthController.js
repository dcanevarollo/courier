/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/** @type {import('../../Utils/Slugify')} */
const slugify = use('App/Utils/Slugify');

/**
 * Resourceful controller for interacting with authentication
 */
class AuthController {
  /**
   * Login method.
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async login({ request, response, auth }) {
    const data = request.post();

    const phone = slugify(data.dial_code + data.phone);

    const { token } = await auth.attempt(phone, data.password);

    const user = await User.findByOrFail({ phone_slug: phone });

    return response.json({ user, token });
  }
}

module.exports = AuthController;
