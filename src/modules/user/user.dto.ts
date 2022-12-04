import { BaseDto, PaginatedResultDto } from '@/modules/base/base.dto'
import { PropertyOf } from '@/types'
import { Exclude, Expose, Type } from 'class-transformer'
import { IsEmail, IsOptional } from 'class-validator'

@Expose()
export class UserDto extends BaseDto {
  constructor(user: PropertyOf<UserDto>) {
    super(user)
    Object.assign(this, user)
  }

  @Expose()
  @IsEmail()
  @IsOptional()
  email!: string

  @Exclude()
  password!: string
}

export class PaginatedUserDto extends PaginatedResultDto<UserDto> {
  @Expose()
  @Type(() => UserDto)
  items!: UserDto[]
}
