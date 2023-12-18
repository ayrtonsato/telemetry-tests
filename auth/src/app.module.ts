import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UserModule, PrismaModule, LoginModule, TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
