import { Column, Entity, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { SlimePost } from "./slime.entity.js";
import { BasicEntity } from "./base/base.entity.js";

export interface authEntity {
  id: number;
  email: string;
  username: string;
  password: string;
  position: "seller" | "buyer";
}

export type authEntityConstructor = {
  new (): authEntity;
};

@Entity()
export class User extends BasicEntity implements authEntity {
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @IsNotEmpty()
  @Column()
  position: "seller" | "buyer";

  @OneToMany(() => SlimePost, (slime_post) => slime_post.user)
  slime_posts: SlimePost[];

  @OneToMany(() => SlimePost, (slime_heart) => slime_heart.user)
  slime_hearts: SlimePost[];
}
