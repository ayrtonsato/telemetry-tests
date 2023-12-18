import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { trace } from '@opentelemetry/api';
import { Span } from '@opentelemetry/sdk-trace-base';
import { User } from './entities/user.entity';

const tracer = trace.getTracer('auth-app');

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    console.log('creating user service')
    const hashPassword = await tracer.startActiveSpan('createUser', async (span: Span) => {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      span.end();
      return hashPassword;
    });
    console.log(`hashedPassword = ${hashPassword}`);
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: hashPassword,
      }
    });
    console.dir(user);
  }

  findAll() {
    return this.prisma.user.findMany({ select: { password: false } });
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id, }, select: { password: false } });
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findFirstOrThrow({ where: { username, } });
    return new User(user.username, user.password);
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
