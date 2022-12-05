import { PaginationParams } from '@/decorators/pagination.decorator'
import { BaseDto, PaginatedResultDto, PaginationParamsDto } from '@/modules/base/base.dto'
import { BaseService } from '@/modules/base/base.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { Request } from 'express'

@Controller()
export class BaseController<T extends BaseService<any>> {
  constructor(private baseService: T) {}

  @Get()
  public async getAll(
    @Req() req: Request,
    @PaginationParams() params: PaginationParamsDto,
  ): Promise<PaginatedResultDto> {
    const result = await this.baseService.getPaginatedResult(params)

    return new PaginatedResultDto(result)
  }

  @Get(':id')
  public async getItem(@Req() req: Request, @Param('id') id: number): Promise<any> {
    const result = await this.baseService.findOneById(id)
    return new BaseDto(result)
  }

  @Post()
  public async createItem(@Req() req: Request, @Body() body: any): Promise<any> {
    console.log(body)
    try {
      const result = await this.baseService.create(body)
      return new BaseDto(result)
    } catch (e) {
      throw new InternalServerErrorException((e as any).message)
    }
  }

  @Put(':id')
  public async updateItem(@Req() req: Request, @Param('id') id: number, @Body() body: any): Promise<any> {
    const result = await this.baseService.updateOneById(id, body)
    return new BaseDto(result)
  }

  @Delete(':id')
  public async deleteItem(@Req() req: Request, @Param('id') id: number): Promise<any> {
    const result = await this.baseService.delete(id)
    if (!result) throw new NotFoundException()

    return {
      message: `Item ID: ${id} has been deleted.`,
    }
  }
}
