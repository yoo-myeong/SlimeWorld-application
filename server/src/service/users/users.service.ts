import { config } from "../../config/config";
import bcrypt from "bcrypt";
import { SignupReqeust } from "../../controller/users/dto/signupRequest";
import { UserRepository } from "../../entity/users/users.repository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UsersService {
    constructor(@InjectRepository() private userRepository: UserRepository) {}

    async create(dto: SignupReqeust) {
        const { email, password, username, position } = dto;
        if (await this.getUserByEmail(email)) {
            throw new Error("중복된 이메일");
        }
        const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
        return this.userRepository.createOne({
            email,
            username,
            position,
            password: hashed,
        });
    }

    private async getUserByEmail(email: string) {
        return this.userRepository.findByEamil(email);
    }
}
