import { SlimeCreateParam } from "./../../controller/slime/dto/createParam";
import { Slime } from "./slime.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Slime)
export class SlimeRepository extends Repository<Slime> {
    async createOne(slimeCreateDto: SlimeCreateParam, userId: number) {
        return await this.save(slimeCreateDto.toEntity(userId));
    }

    deleteOne(id: number) {
        return this.delete({ id });
    }

    getAll() {
        return this.find();
    }

    getById(id: number) {
        return this.findOne({ where: { id } });
    }
}
