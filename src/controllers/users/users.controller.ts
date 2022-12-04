import { PaginationParams } from '@/decorators/pagination.decorator'
import { PaginationParamsDto } from '@/modules/base/base.dto'
import { PaginatedUserDto } from '@/modules/user/user.dto'
import { UserService } from '@/modules/user/user.service'
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAll(@Req() req: Request, @PaginationParams() params: PaginationParamsDto) {
    const result = await this.userService.getPaginatedResult(params)

    return new PaginatedUserDto(result)
  }
}
