import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class AuthService {

    constructor(private crudSevice:CrudService,
        private jwtService:JwtService
        ){}


    async validateUser(email:string,password:string){
        const user = await this.crudSevice.findByEmail(email);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
          }
          return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
