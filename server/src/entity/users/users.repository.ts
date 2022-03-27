import { EntityRepository, Repository } from "typeorm";
import { User } from "./users.entity";

export type userData = {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    position?: "seller" | "buyer";
};

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByEamil(email: string) {
        return this.findOne({ email });
    }

    createOne(data: userData) {
        return this.insert(data);
    }
}
