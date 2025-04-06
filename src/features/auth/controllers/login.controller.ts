import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { logger } from 'src/common/utils/logger';
import { LoginService } from '../services/login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res): Promise<void> {
    logger.log('controller - auth - login');
    const response = await this.loginService.login(body);
    res.status(200).json(response);
  }

  @Get('protected')
  getProtected(@Req() req, @Res() res): void {
    if (req.isAuthenticated()) {
      res.send(`Welcome, ${req.user}!`);
    } else {
      res.redirect('/auth/google');
    }
  }
}
