import { SlimeOption } from "./slime.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SlimeOption)
export class SlimeOptionRepository extends Repository<SlimeOption> {
    createOptions(slimeId: number, options: string[]) {
        return options.forEach((option) => {
            this.insert({ option, slimeId });
        });
    }

    getById(id: number) {
        return this.find({ select: ["option"], where: { slimeId: id } });
    }
}
