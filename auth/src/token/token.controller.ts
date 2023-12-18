import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) { }

    @Post()
    @HttpCode(204)
    verify(@Body() { token }) {
        try {
            this.tokenService.verifyToken(token);
        } catch (e) {
            if (e instanceof Error && e.message == 'Invalid token') {
                throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
            }
            throw e;
        }
    }
}
