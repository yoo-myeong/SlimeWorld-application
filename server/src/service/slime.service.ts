import { DeleteResult, getRepository, Repository } from "typeorm";
import { postEntity, postEntityConstructor, postOptionEntity, postOptionEntityConstructor } from "../data/slime.entity";

export type postData = {
  title: string;
  media: "video" | "image";
  description: string;
  saleSite: string;
  options?: Array<string>;
  mediaURL: string;
};

export interface postService {
  getPost(): Promise<postEntity[]>;
  createPost(data: Partial<postData>, userId: number): Promise<postEntity>;
  deletePost(postId: string, userId: number): Promise<DeleteResult>;
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

  async getPost(): Promise<postEntity[]> {
    return this.slimeRepository.find();
  }

  async createPost(data: postData, userId: number): Promise<postEntity> {
    const options = data.options;
    delete data.options;

    const postModel = new this.postRepository();
    postModel.userId = userId;
    const keys = Object.keys(data);
    keys.forEach((key) => {
      postModel[key] = data[key];
    });
    const post = await this.slimeRepository.save(postModel);

    if (options) {
      options.forEach((option) => {
        const optionModel = new this.optionRepositroy();
        optionModel.option = option;
        optionModel.slimePostId = postModel.id;
        this.slimeOptionRepository.save(optionModel);
      });
    }

    return post;
  }

  async deletePost(postId: string, userId: number): Promise<DeleteResult> {
    return this.slimeRepository
      .createQueryBuilder()
      .delete()
      .where("id=:id, userId=:userId", { id: postId, userId })
      .execute();
  }
}
