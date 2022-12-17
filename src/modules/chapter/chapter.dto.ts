import { IChapter, IChapterContent } from '@/types/chapter.d'
import { PropertyOf } from '@/types'
import { Expose, Type } from 'class-transformer'
import { BaseDto, PaginatedResultDto } from '@/modules/base/base.dto'
import { ChapterContentType } from '@/constants/chapter'
import { IsEnum } from 'class-validator'

@Expose()
export class ChapterContentDto implements IChapterContent {
  @Expose()
  @IsEnum(ChapterContentType)
  type!: ChapterContentType

  @Expose()
  content!: string

  @Expose()
  verse?: number | undefined
}

@Expose()
export class ChapterDto extends BaseDto implements IChapter {
  constructor(chapter: PropertyOf<ChapterDto>) {
    super(chapter)
  }

  @Expose()
  bookId!: number

  @Expose()
  bookName!: string

  @Expose()
  bookNameLW!: string

  @Expose()
  bookNameTH!: string

  @Expose()
  chapter!: number

  @Expose()
  @Type(() => ChapterContentDto)
  contents!: IChapterContent[]
}

@Expose()
export class PaginatedChapterDto extends PaginatedResultDto<ChapterDto> {
  @Expose()
  @Type(() => ChapterDto)
  items!: ChapterDto[]
}
