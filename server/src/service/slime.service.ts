import { DeleteResult, getRepository, Repository } from "typeorm";
import {
  postEntity,
  postEntityConstructor,
  postOptionEntity,
  postOptionEntityConstructor,
} from "../entity/slime.entity.js";

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
  getTags(id: string): Promise<postOptionEntity[]>;
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
    const { options, ...post } = data;

    const postModel = new this.postRepository();
    postModel.userId = userId;
    const keys = Object.keys(post);
    keys.forEach((key) => {
      postModel[key] = post[key];
    });
    const response = await this.slimeRepository.save(postModel);
    if (options) {
      options.forEach((option) => {
        const optionModel = new this.optionRepositroy();
        optionModel.option = option;
        optionModel.slimePostId = postModel.id;
        this.slimeOptionRepository.save(optionModel);
      });
    }

    return response;
  }

  async deletePost(postId: string, userId: number): Promise<DeleteResult> {
    const post = await this.getPostUserIdById(postId);
    if (post.userId !== userId) {
      throw new Error("삭제 권한 없음");
    }
    return this.slimeRepository
      .createQueryBuilder()
      .delete()
      .where("id=:id AND userId=:userId", { id: postId, userId })
      .execute();
  }

  async getPostUserIdById(id: string) {
    return this.slimeRepository.findOne({ select: ["userId"], where: { id } });
  }

  async getTags(id: string): Promise<postOptionEntity[]> {
    return this.slimeOptionRepository.find({ select: ["option"], where: { slimePostId: id } });
  }
}
