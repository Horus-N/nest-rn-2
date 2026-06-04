import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   some requests from client
  // post : ..../auth/register
  @Post('register') //register a new user
  registerr(@Body() body: AuthDTO) {
    // body 'type must be  a " Data Transfer object" - DTO
    //  now controller calls "service"
    console.log('body, ', body);

    return this.authService.register(body);
  }

  //post: ..../auth/login
  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
