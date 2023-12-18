import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CatService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCatDto: CreateCatDto) {
    return this.prisma.cat.create({ data: createCatDto });
  }

  async findAll() {
    return await this.prisma.cat.findMany();
  }

  findOne(id: number) {
    return this.prisma.cat.findUniqueOrThrow({ where: { id } });
  }

  findByName(name: string) {
    return this.prisma.cat.findFirstOrThrow({ where: { name } });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return this.prisma.cat.update({ where: { id }, data: updateCatDto });
  }

  remove(id: number) {
    return this.prisma.cat.delete({ where: { id } })
  }
}
