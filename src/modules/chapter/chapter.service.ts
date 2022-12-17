import { IChapter } from '@/types/chapter.d'
import { ChapterDocument } from '@/schemas/chapter.schema'
import { BaseService } from '@/modules/base/base.service'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import raw from '@/lib/lawabible-json/lawabible.json'
import { pick } from 'lodash'
import { PaginationParams, ExtractModel, PaginatedResult } from '@/types'
import { Order } from '@/constants'

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

  public async getPaginatedResult(
    params: PaginationParams<ExtractModel<ChapterDocument>>,
    condition?: Partial<ExtractModel<ChapterDocument>> | undefined,
  ): Promise<PaginatedResult<ChapterDocument>>
  public async getPaginatedResult(
    params: PaginationParams<ExtractModel<ChapterDocument>>,
    condition?: FilterQuery<ChapterDocument> | undefined,
  ): Promise<PaginatedResult<ChapterDocument>>
  public async getPaginatedResult(
    params: PaginationParams<ExtractModel<ChapterDocument>>,
    condition: any = {},
  ): Promise<PaginatedResult<ChapterDocument>> {
    condition = this.cleanUndefinedProperties(condition)

    return new Promise((resolve, reject) => {
      this.chapterModel.aggregate(
        [
          {
            $facet: {
              totalItems: [
                {
                  $match: condition,
                },
                {
                  $count: 'id',
                },
              ],
              items: [
                {
                  $match: condition,
                },
                {
                  $sort: {
                    [params.sort ?? 'id']: params.order === Order.ASC ? 1 : -1,
                  },
                },
                {
                  $skip: Math.max((params.page - 1) * params.limit, 0),
                },
                {
                  $limit: Math.max(params.limit, 0),
                },
              ],
            },
          },
          {
            $unwind: {
              path: '$totalItems',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $replaceWith: {
              totalItems: '$totalItems.id',
              items: '$items',
            },
          },
        ],
        (err: any, data: any) => {
          if (err) reject(err)
          resolve({
            page: params.page,
            limit: Math.max(params.limit, 0),
            totalItems: data[0].totalItems,
            totalPages: Math.ceil(data[0].totalItems / Math.max(params.limit, 0)),
            items: data[0].items,
          })
        },
      )
    })
  }
}
