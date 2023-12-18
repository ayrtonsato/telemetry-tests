import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
