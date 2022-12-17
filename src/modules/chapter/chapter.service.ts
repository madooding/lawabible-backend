import { IChapter } from './../../types/chapter.d'
import { ChapterDocument } from '@/schemas/chapter.schema'
import { BaseService } from '@/modules/base/base.service'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import raw from '@/lib/lawabible-json/lawabible.json'
import { pick } from 'lodash'

@Injectable()
export class ChapterService extends BaseService<ChapterDocument> {
  private logger = new Logger('Chapter Service')

  constructor(@InjectModel('Chapter') private chapterModel: Model<ChapterDocument>) {
    super(chapterModel)
  }

  public async preInit() {
    try {
      const start = +new Date()
      let chapters = raw as IChapter[]
      chapters = chapters
        .map((chapter) => pick(chapter, ['bookId', 'bookName', 'bookNameLW', 'bookNameTH', 'chapter', 'contents']))
        .map((chapter, i) => ({ ...chapter, id: i + 1 }))
      await this.chapterModel.deleteMany()
      const result = await this.chapterModel.insertMany(chapters)
      const end = +new Date()
      this.logger.log(
        `${result.length.toLocaleString()} chapter(s) has been added to database in ${(end - start) / 1000} second(s).`,
      )
    } catch (e) {
      throw e
    }
  }
}
