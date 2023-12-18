import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) { }

  async login(loginDto: LoginDto) {
    console.log('login')
    const user = await this.userService.findByUsername(loginDto.username);
    console.log('Found user ', user)
    if (!user) {
      throw new NotFoundException();
    }
    const hash = await bcrypt.hash(loginDto.password, 10);
    console.log(hash);
    console.log(hash == user.password);
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Not Authorized', 401);
    }
    const token = this.tokenService.generateToken(loginDto.username);
    return {
      token,
    };
  }
}
