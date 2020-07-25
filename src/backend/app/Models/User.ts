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
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm';
import Conversation from './Conversation';
import File from './File';
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public phone: string;

  @column({ serializeAs: null })
  public phoneSlug: string;

  @column({ serializeAs: null })
  public password: string;

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

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) user.password = await Hash.hash(user.password);
  }
}
