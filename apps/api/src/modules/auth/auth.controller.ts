import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Res() res: FastifyReply) {
    const result = await this.authService.login(body);

    // Set secure cookie as per Document 5 §5.6
    res.header(
      'Set-Cookie',
      `ps_session=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
    );

    return res.status(HttpStatus.OK).send(result);
  }

  @Post('logout')
  logout(@Res() res: FastifyReply) {
    res.header(
      'Set-Cookie',
      'ps_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
    );
    return res.status(HttpStatus.OK).send({ message: 'Successfully logged out.' });
  }
}
