import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Message from './Message';

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column({ serializeAs: null })
  public senderId: string;

  @belongsTo(() => User, { foreignKey: 'senderId' })
  public sender: BelongsTo<typeof User>;

  @column({ serializeAs: null })
  public receiverId: string;

  @belongsTo(() => User, { foreignKey: 'receiverId' })
  public receiver: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>;
}
