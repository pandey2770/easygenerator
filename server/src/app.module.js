import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth-app'),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }
