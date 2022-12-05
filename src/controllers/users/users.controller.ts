import { PaginationParams } from '@/decorators/pagination.decorator'
import { PaginationParamsDto } from '@/modules/base/base.dto'
import { PaginatedUserDto } from '@/modules/user/user.dto'
import { UserService } from '@/modules/user/user.service'
import { UserDocument } from '@/schemas/user.schema'
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { BaseController } from '../base/base.controller'

@Controller('users')
export class UsersController extends BaseController<UserService, UserDocument> {
  constructor(private userService: UserService) {
    super(userService)
  }

  @Get()
  public async getAll(@Req() req: Request, @PaginationParams() params: PaginationParamsDto) {
    return new PaginatedUserDto(await super.getAll(req, params))
  }
}
