import { IAccessTokenPayload } from '@/types/auth'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_ACCESS_TOKEN,
    })
  }

  async validate(payload: IAccessTokenPayload) {
    // TODO: Inject user data to the request payload
    return payload
  }
}
