import { ChapterService } from '@/modules/chapter/chapter.service'
import { BaseController } from '@/controllers/base/base.controller'
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { PaginationParamsDto, PaginatedResultDto } from '@/modules/base/base.dto'
import { PaginationParams } from '@/decorators/pagination.decorator'
import { PaginatedChapterDto } from '@/modules/chapter/chapter.dto'

@Controller('chapters')
export class ChaptersController extends BaseController<ChapterService> {
  constructor(private chapterService: ChapterService) {
    super(chapterService)

    // this.chapterService.preInit()
  }

  @Get()
  public async getAll(
    @Req() req: Request,
    @PaginationParams() params: PaginationParamsDto,
  ): Promise<PaginatedResultDto<any>> {
    return await this.chapterService.getPaginatedResult(params).then((res) => new PaginatedChapterDto(res))
  }
}
