import { ChapterDocument } from '@/schemas/chapter.schema'
import { BaseService } from '@/modules/base/base.service'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import raw from '@/lib/lawabible-json/lawabible.json'

@Injectable()
export class ChapterService extends BaseService<ChapterDocument> {
  constructor(@InjectModel('Chapter') private chapterModel: Model<ChapterDocument>) {
    super(chapterModel)
  }

  public readPreInitJSON() {
    console.log(typeof raw)
  }
}
