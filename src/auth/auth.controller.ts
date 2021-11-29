import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

// http://localhost:3000/auth
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    // http://localhost:3000/auth/signup
    @Post("signup")
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {

        return await this.authService.signUp(authCredentialsDto);

    }

    @Post("signin")
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }> {

        return await this.authService.signIn(authCredentialsDto);

    }

    @Post("secure")
    @UseGuards(AuthGuard())
    secure(@Req() req): boolean {
        console.log("Rota restrita", req);
        return true;
    }

}
