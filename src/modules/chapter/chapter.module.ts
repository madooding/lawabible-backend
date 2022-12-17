import { createMongooseModule } from '@/helpers'
import { Chapter, ChapterSchema } from '@/schemas/chapter.schema'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { ChapterService } from './chapter.service'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Chapter.name,
        useFactory: (connection) => createMongooseModule(Chapter, ChapterSchema, connection),
        inject: [getConnectionToken()],
      },
    ]),
  ],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}
