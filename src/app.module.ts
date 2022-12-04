import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './controllers/users/users.controller'
import { UserModule } from './modules/user/user.module'

import './environment'

import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST!, {
      authSource: 'admin',
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }),
    UserModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
