import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import { hash, genSalt } from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {

        const { username, password } = authCredentialsDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        const newUser = this.create({
            username,
            password: hashedPassword,
        });

        // console.log("salt", salt);
        // console.log("pass", hashedPassword);

        try {

            await this.save(newUser);

            return newUser;

        } catch (error) {

            if (error.sqlState === '23000') {
                throw new ConflictException("Este nome de usuário já está sendo usado.");
            } else {
                throw new InternalServerErrorException();
            }

        }        

    }

}