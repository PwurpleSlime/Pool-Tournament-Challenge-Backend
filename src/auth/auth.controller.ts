import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({ status: 200 })
  getAccounts() {
    return this.authService.getAccounts();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new account' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
  })
  @ApiResponse({ status: 201 })
  addAccount(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.addAccount(username, password);
  }

  @Post('check')
  @ApiOperation({ summary: 'Check account password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'password'],
    },
  })
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async checkPassword(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    console.log(username, password);
    
    return await this.authService.checkPassword(username, password);
  }
}
