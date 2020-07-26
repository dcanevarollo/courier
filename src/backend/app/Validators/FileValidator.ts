import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class FileValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['png', 'jpg', 'JPG', 'jpeg'],
    }),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: 'The file is required',
    'file.size': 'Image size must be under 5 MB',
    'file.extnames': 'You can only upload images',
  };
}
