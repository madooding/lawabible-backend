import { PropertyOf } from '@/types'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Base, BaseDocument } from './base.schema'

@Schema({ timestamps: true })
export class User extends Base {
  constructor(user?: PropertyOf<User>) {
    super()
    if (user) Object.assign(this, user)
  }

  @Prop({ unique: true })
  email!: string

  @Prop()
  password!: string
}

export type UserDocument = User & BaseDocument
export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.loadClass(User)
