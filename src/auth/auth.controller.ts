import { Body, Controller, Post,Request,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {

    constructor(private authSevice:AuthService){}
    @UseGuards(AuthGuard('local'))

    @Post('/login')
    async login(@Request() req:any){
      return this.authSevice.login(req.user);
    }

}