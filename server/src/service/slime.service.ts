import { getRepository, Repository } from "typeorm";
import { postEntity, postEntityConstructor, postOptionEntity, postOptionEntityConstructor } from "../data/slime.entity";

export type postData = {
  title: string;
  media: "video" | "image";
  mediaURL: string;
  description: string;
  saleSite: string;
  options: Array<string>;
};

export interface postService {
  createSlimePost(data: Partial<postData>, userId: number): Promise<postEntity>;
}

export type postServiceConstructor = {
  new (Entity: postEntityConstructor, optionEntity: postOptionEntityConstructor): postService;
};

export class SlimeService implements postService {
  private slimeRepository: Repository<postEntity>;
  private slimeOptionRepository: Repository<postOptionEntity>;
  constructor(private postRepository: postEntityConstructor, private optionRepositroy: postOptionEntityConstructor) {
    this.slimeRepository = getRepository(postRepository);
    this.slimeOptionRepository = getRepository(optionRepositroy);
  }

  async createSlimePost(data: postData, userId: number): Promise<postEntity> {
    const options: Array<string> = data.options;
    delete data.options;

    const postModel = new this.postRepository();
    postModel.userId = userId;
    const keys = Object.keys(data);
    keys.forEach((key) => {
      postModel[key] = data[key];
    });
    const post = await this.slimeRepository.save(postModel);

    options.forEach((option) => {
      const optionModel = new this.optionRepositroy();
      optionModel.option = option;
      optionModel.slimePostId = postModel.id;
      this.slimeOptionRepository.save(optionModel);
    });

    return post;
  }
}
