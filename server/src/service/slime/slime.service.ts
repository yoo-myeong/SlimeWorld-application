import { SlimeCreateParam } from "./../../controller/slime/dto/createParam";
import { SlimeCreateRequest } from "./../../controller/slime/dto/createRequest";
import { SlimeOptionRepository } from "./../../entity/slime/slimeOption.repository";
import { SlimeRepository } from "./../../entity/slime/slime.repository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";
import { plainToClass } from "class-transformer";

@Service()
export class SlimeService {
    constructor(
        @InjectRepository() private slimeRepository: SlimeRepository,
        @InjectRepository() private optionRepositroy: SlimeOptionRepository,
    ) {}

    async get() {
        return this.slimeRepository.getAll();
    }

    async create(data: SlimeCreateRequest, userId: number) {
        const { options, ...param } = data;
        const slimeParam = plainToClass(SlimeCreateParam, param);

        const slime = await this.slimeRepository.createOne(slimeParam, userId);

        if (options) {
            this.optionRepositroy.createOptions(slime.id, options);
        }

        return slime;
    }

    async delete(id: number, userId: number) {
        const slime = await this.slimeRepository.getById(id);
        if (slime.userId !== userId) {
            throw new Error("삭제 권한 없음");
        }

        return this.slimeRepository.deleteOne(id);
    }

    async getTags(id: number) {
        return this.optionRepositroy.getById(id);
    }
}
