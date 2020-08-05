/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with friends
 */
class FriendController {
  /**
   * Create/save a new friend.
   * POST friends
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    const data = request.post();

    await User.findOrFail(data.friend_id);

    await auth.user?.friends().attach([data.friend_id]);

    return response.send();
  }

  /**
   * Delete a friend with id.
   * DELETE friends/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy({ params, response, auth }) {
    const { id: friendId } = params;

    await auth.user?.friends().detach([friendId]);

    return response.send();
  }
}

module.exports = FriendController;
