import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { PropertyOf } from '@/types'
import { IChapter, IChapterContent } from './../types/chapter.d'
import { Base, BaseDocument } from '@/schemas/base.schema'
import { Types } from 'mongoose'

@Schema({ timestamps: true })
export class Chapter extends Base implements IChapter {
  constructor(chapter?: PropertyOf<Chapter>) {
    super(chapter)
  }

  @Prop({ type: Number, required: true })
  chapter!: number

  @Prop({ type: String, required: true })
  bookName!: string

  @Prop({ type: Types.Array, default: [] })
  contents!: IChapterContent[]
}

export type ChapterDocument = Chapter & BaseDocument
export const ChapterSchema = SchemaFactory.createForClass(Chapter)

ChapterSchema.loadClass(Chapter)
