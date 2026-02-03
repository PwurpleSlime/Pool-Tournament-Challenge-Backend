import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiResponse({
    status: 200
  })
  getAccounts(){
    return this.authService.getAccounts()
  }
}
