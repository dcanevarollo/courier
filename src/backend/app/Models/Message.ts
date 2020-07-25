import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Conversation from './Conversation';
import User from './User';

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column({ serializeAs: null })
  public conversationId: string;

  @belongsTo(() => Conversation)
  public conversation: BelongsTo<typeof Conversation>;

  @column({ serializeAs: null })
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column({ columnName: 'response_to', serializeAs: null })
  public responseToId: string;

  @belongsTo(() => Message, { foreignKey: 'responseToId' })
  public responseTo: BelongsTo<typeof Message>;

  @hasOne(() => Message, { foreignKey: 'responseToId' })
  public response: HasOne<typeof Message>;

  @column()
  public isStarred: boolean;

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => {
      return value ? value.toFormat('HH:mm') : value;
    },
    serializeAs: 'sent_time',
  })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
