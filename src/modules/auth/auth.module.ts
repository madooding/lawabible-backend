import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { TokenStrategy } from './token.strategy'

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, TokenStrategy],
  exports: [AuthService, TokenStrategy],
})
export class AuthModule {}
