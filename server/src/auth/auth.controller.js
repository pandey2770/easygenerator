import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() body) {
    const { name, email, password } = body;
    return this.authService.signUp(name, email, password);
  }

  @Post('signin')
  async signIn(@Body() body) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }
}
