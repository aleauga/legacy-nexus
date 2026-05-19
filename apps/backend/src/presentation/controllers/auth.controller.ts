import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { LoginDto } from '../../application/dto/login.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.loginUseCase.execute(dto);
    if (!user) {
      return { error: 'invalid credentials' };
    }
    return user;
  }
}
