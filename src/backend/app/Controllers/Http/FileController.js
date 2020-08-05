/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers');

/** @type {typeof import('../../Models/File')} */
const File = use('App/Models/File');

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/** @type {typeof import('../../Models/Message')} */
const Message = use('App/Models/Message');

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { entity, id } = request.get();

    const user = entity === 'user' && (await User.findOrFail(id));
    const message = entity === 'message' && (await Message.findOrFail(id));

    const file = request.file('file');

    await file.move(Helpers.tmpPath('uploads'), {
      name: `${Date.now()}.${file.extname}`,
    });

    const fileData = {
      name: file.fileName,
      type: file.type,
      subtype: file.subtype,
    };

    if (user) await user.picture().create(fileData);
    else if (message) await message.file().create(fileData);

    return response.send();
  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const { id } = params;

    const file = await File.findOrFail(id);

    return response.download(Helpers.tmpPath(`uploads/${file.name}`));
  }
}

module.exports = FileController;
