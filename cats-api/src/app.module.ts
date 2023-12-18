import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [CatModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
