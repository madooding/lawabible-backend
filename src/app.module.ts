import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './controllers/users/users.controller'
import { UserModule } from './modules/user/user.module'

import './environment'

import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { TokenModule } from './modules/token/token.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { ChaptersController } from './controllers/chapters/chapters.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST!, {
      authSource: 'admin',
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }),
    UserModule,
    AuthModule,
    TokenModule,
    ChapterModule,
  ],
  controllers: [AppController, UsersController, AuthController, ChaptersController],
  providers: [AppService],
})
export class AppModule {}
