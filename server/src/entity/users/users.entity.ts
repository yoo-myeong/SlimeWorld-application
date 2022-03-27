import { Column, Entity, OneToMany } from "typeorm";
import { SlimePost } from "../slime.entity";
import { BasicEntity } from "../base.entity";

@Entity()
export class User extends BasicEntity {
    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    position: "seller" | "buyer";

    @OneToMany(() => SlimePost, (slime_post) => slime_post.user)
    slime_posts: SlimePost[];
}
