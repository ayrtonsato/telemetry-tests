import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const SECRET = 'supersecret.shiii';

@Injectable()
export class TokenService {
    generateToken(username: string) {
        return jwt.sign({ username }, SECRET);
    }

    verifyToken(token: string) {
        try {
            jwt.verify(token, SECRET);
            return;
        } catch (e) {
            throw new Error('Invalid token');
        }
    }
}
