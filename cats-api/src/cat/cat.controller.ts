import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Header, Headers, HttpException } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import axios from 'axios';

async function login(token: string) {
  try {
    await axios.post(`${process.env.LOGIN_URL}/token`, { token });
  } catch (e) {
    throw new HttpException('Forbidden', 403);
  }
}

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) { }

  @Post()
  @HttpCode(201)
  async create(@Headers('token') token: string, @Body() createCatDto: CreateCatDto) {
    await login(token);
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(@Headers('token') token: string) {
    await login(token);
    return this.catService.findAll();
  }

  @Get(':id')
  async findOne(@Headers('token') token: string, @Param('id') id: string) {
    await login(token);
    return this.catService.findOne(+id);
  }

  @Patch(':id')
  async update(@Headers('token') token: string, @Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    await login(token);
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Headers('token') token: string, @Param('id') id: string) {
    await login(token);
    await this.catService.remove(+id);
  }
}
