import { Column, Entity, OneToMany } from "typeorm";
import { Slime } from "../slime/slime.entity";
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

    @OneToMany(() => Slime, (slime) => slime.user)
    slime: Slime[];
}
