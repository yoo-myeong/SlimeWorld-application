import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./auth.entity.js";
import { BasicEntity } from "./base/base.entity.js";

export interface postEntity {
  id: number;
  title: string;
  media: "video" | "image";
  mediaURL: string;
  description: string;
  saleSite: string;
  slime_options: SlimeOption[];
  userId: number;
}

export type postEntityConstructor = {
  new (): postEntity;
};

@Entity()
export class SlimePost extends BasicEntity implements postEntity {
  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  media: "video" | "image";

  @IsNotEmpty()
  @Column()
  mediaURL: string;

  @IsNotEmpty()
  @Column("text")
  description: string;

  @Column("text")
  saleSite: string;

  @ManyToOne(() => User, (user) => user.slime_posts)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => SlimeOption, (slime_option) => slime_option.slime_post)
  slime_options: SlimeOption[];
}

export interface postOptionEntity {
  id: number;
  option: string;
  slimePostId: number;
}

export type postOptionEntityConstructor = {
  new (): postOptionEntity;
};

@Entity()
export class SlimeOption extends BasicEntity implements postOptionEntity {
  @Column()
  option: string;

  @ManyToOne(() => SlimePost, (slime_post) => slime_post.slime_options, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "slimePostId" })
  slime_post: SlimePost;

  @Column()
  slimePostId: number;
}
