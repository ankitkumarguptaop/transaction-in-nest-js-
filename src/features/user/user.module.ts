import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController ],
  providers: [UserService ,UserRepository] ,
  exports: [TypeOrmModule],
})
export class UserModule {}
