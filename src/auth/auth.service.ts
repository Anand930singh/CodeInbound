import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class AuthService {
    constructor(
        private crudService: CrudService,
        private jwtService: JwtService,
    ) {}

    // Validate the user's credentials
    async validateUser(email: string, password: string) {
        // Find the user by email
        const user = await this.crudService.findByEmail(email);

        // Check if the user exists and the password is correct
        if (user && user.password === password) {
            // Exclude the password field from the returned user object
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    // Generate and return the JWT token for the authenticated user
    async login(user: any) {
        // Create the payload for the JWT token
        const payload = { email: user.email, sub: user.userId };

        // Generate and return the access_token
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
