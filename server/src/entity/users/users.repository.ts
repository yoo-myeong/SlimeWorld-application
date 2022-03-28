import { SignupReqeust } from "./../../controller/users/dto/signupRequest";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./users.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByEamil(email: string) {
        return this.findOne({ email });
    }

    createOne(data: SignupReqeust) {
        return this.insert(data);
    }
}
