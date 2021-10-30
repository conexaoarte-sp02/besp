import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {

        return await this.usersRepository.createUser(authCredentialsDto);

    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }> {

        const { username, password } = authCredentialsDto;

        const user = await this.usersRepository.findOne({ username });

        if (user && (await compare(password, user.password))) {
            
            const payload: JwtPayload = { username };

            const accessToken = this.jwtService.sign(payload);

            return { accessToken };

        } else {

            throw new UnauthorizedException("Usuário ou senha inválidos!");

        }

    }

}
