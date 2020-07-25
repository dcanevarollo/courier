import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  computed,
} from '@ioc:Adonis/Lucid/Orm';
import Env from '@ioc:Adonis/Core/Env';
import User from './User';
import Message from './Message';

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: string;

  @column({ serializeAs: null })
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column({ serializeAs: null })
  public messageId: string;

  @belongsTo(() => Message)
  public message: BelongsTo<typeof Message>;

  @column({ serializeAs: null })
  public name: string;

  @column({ serializeAs: null })
  public type: string;

  @column({ serializeAs: null })
  public subtype: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @computed()
  public get url() {
    return `${Env.get('APP_EXT_URL')}/files/${this.id}`;
  }
}
