import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google.auth.guard';
import { Request, Response } from 'express';
import { LoginService } from '../services/login.service';

@Controller('google')
export class TestController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async teste(
    @Body() body: { email: string; password: string },
    @Res() res,
  ): Promise<void> {
    res.send('<a href="/google">Authenticate with Google');
  }

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const { token } = await this.loginService.loginWithIdentityProviders(
        req.user,
      );
      res.redirect(`/protected?token=${token}`);
    } catch (err) {
      console.error('Error during Google authentication:', err);
      res.redirect('/auth/failure');
    }
  }

  @Get('protected')
  protected(@Req() req: Request, @Res() res: Response) {
    const token = req.query.token as string;
    console.log(token);
    res.send(`Bem-vindo`);
  }

  @Get('auth/failure')
  authFailure(@Res() res: Response) {
    res.send('Falha na autenticação');
  }
}
