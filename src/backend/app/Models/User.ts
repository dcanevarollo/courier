import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Conversation from './Conversation';
import File from './File';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public phoneNumber: string;

  @column()
  public about: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @hasMany(() => Conversation, { foreignKey: 'senderId' })
  public conversations: HasMany<typeof Conversation>;

  @manyToMany(() => User, {
    pivotTable: 'friends',
    pivotRelatedForeignKey: 'friend_id',
  })
  public friends: ManyToMany<typeof User>;

  @hasOne(() => File)
  public picture: HasOne<typeof File>;
}
