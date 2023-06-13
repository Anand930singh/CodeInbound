import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  
    profile(){
        // No logic this is created to to check this route can be opened when jwt token is generated
        //  /auth/login->{
        //                  "email":"" ,
        //                   "password",""
        //                 }
        //  it will generate token
        // now you can use /profile route using this token
        
    }
}
