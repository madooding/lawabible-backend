import { PaginationParams } from '@/decorators/pagination.decorator'
import { PaginationParamsDto } from '@/modules/base/base.dto'
import { PaginatedUserDto, UserCreateDto, UserDto } from '@/modules/user/user.dto'
import { UserService } from '@/modules/user/user.service'
import { BadRequestException, Body, Controller, Get, Logger, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { BaseController } from '@/controllers/base/base.controller'

@Controller('users')
export class UsersController extends BaseController<UserService> {
  private logger: Logger = new Logger('User Controller')

  constructor(private userService: UserService) {
    super(userService)
  }

  @Get()
  public async getAll(@Req() req: Request, @PaginationParams() params: PaginationParamsDto) {
    return new PaginatedUserDto(await super.getAll(req, params))
  }

  @Post()
  public async createItem(@Req() req: Request, @Body() data: UserCreateDto) {
    const user = await this.userService.findOne({ email: data.email }).catch(() => null)
    if (user) throw new BadRequestException('This email is already exist!')

    const hash = await this.userService.hashPassword(data.password)
    const result = await this.userService.create({ ...data, password: hash })

    return new UserDto(result)
  }
}
