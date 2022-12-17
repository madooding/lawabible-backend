import { ChapterDto } from './../../modules/chapter/chapter.dto'
import { ChapterService } from '@/modules/chapter/chapter.service'
import { BaseController } from '@/controllers/base/base.controller'
import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  MethodNotAllowedException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { PaginationParamsDto, PaginatedResultDto } from '@/modules/base/base.dto'
import { PaginationParams } from '@/decorators/pagination.decorator'
import { PaginatedChapterDto } from '@/modules/chapter/chapter.dto'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

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

  @Get(':bookId/:chapter')
  public async getChapter(
    @Req() req: Request,
    @Param('bookId') bookId: number,
    @Param('chapter', new DefaultValuePipe(1)) chapter: number,
  ): Promise<ChapterDto> {
    try {
      const result = await this.chapterService.findOne({
        bookId,
        chapter,
      })
      return new ChapterDto(result.toObject())
    } catch (e) {
      throw e
    }
  }

  @Get(':id')
  public getItem(req: Request, @Param('id') id: number) {
    return this.getChapter(req, id, 1)
  }

  @Post()
  public createItem(req: Request, @Param('id') id: number): Promise<any> {
    throw new MethodNotAllowedException()
  }

  @Put(':id')
  public updateItem(req: Request, @Param('id') id: number): Promise<any> {
    throw new MethodNotAllowedException()
  }

  @Delete(':id')
  public deleteItem(req: Request, @Param('id') id: number): Promise<any> {
    throw new MethodNotAllowedException()
  }
}
