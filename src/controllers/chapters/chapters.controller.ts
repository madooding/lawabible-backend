import { ChapterService } from '@/modules/chapter/chapter.service'
import { BaseController } from '@/controllers/base/base.controller'
import { Controller } from '@nestjs/common'

@Controller('chapters')
export class ChaptersController extends BaseController<ChapterService> {
  constructor(private chapterService: ChapterService) {
    super(chapterService)

    this.chapterService.preInit()
  }
}
