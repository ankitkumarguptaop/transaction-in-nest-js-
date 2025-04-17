import { Injectable, UnauthorizedException } from '@nestjs/common';
const jwt = require('jsonwebtoken');
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UpdateUserDto } from './update-user.dto';
import { SignInUserDto } from './signin-user.dto';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  generateToken = (id: number) => {
    return jwt.sign({ id }, this.configService.get<number>('JWT_SECRET'), {
      expiresIn: '3d',
    });
  };
  async signIn(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findUser(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id: id });
  }
}
