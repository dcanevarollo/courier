/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/** @type {import('../../Utils/Slugify')} */
const slugify = use('App/Utils/Slugify');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post();

    const user = await User.create({
      ...data,
      phone_slug: slugify(data.phone),
    });

    return response.send(user.id);
  }
}

module.exports = UserController;
