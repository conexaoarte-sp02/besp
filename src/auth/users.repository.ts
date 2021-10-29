import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {

        const { username, password } = authCredentialsDto;

        const newUser = this.create({
            username,
            password,
        });

        await this.save(newUser);

        return newUser;

    }

}