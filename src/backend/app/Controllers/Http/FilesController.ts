import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';
import User from 'App/Models/User';
import Message from 'App/Models/Message';
import FileValidator from 'App/Validators/FileValidator';
import File from 'App/Models/File';

export default class FilesController {
  public async store({ request, response }: HttpContextContract) {
    const { file } = await request.validate(FileValidator);

    const { entity, id } = request.get();

    const user = entity === 'user' && (await User.findOrFail(id));
    const message = entity === 'message' && (await Message.findOrFail(id));

    await file.move(Application.tmpPath('uploads'), {
      name: `${new Date().getTime()}.${file.extname}`,
    });

    const data = {
      name: file.fileName,
      type: file.type,
      subtype: file.subtype,
    };

    if (user)
      await user.related('picture').updateOrCreate({ userId: user.id }, data);
    else if (message)
      await message
        .related('file')
        .updateOrCreate({ messageId: message.id }, data);

    return response.created(null);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const file = await File.findOrFail(id);

    return response.download(Application.tmpPath(`uploads/${file.name}`));
  }
}
