import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../users/users.entity";
import { BasicEntity } from "../base.entity";

@Entity()
export class Slime extends BasicEntity {
    @Column()
    title: string;

    @Column()
    media: "video" | "image";

    @Column()
    mediaURL: string;

    @Column("text")
    description: string;

    @Column("text")
    saleSite: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.slime, { createForeignKeyConstraints: true })
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => SlimeOption, (slime_option) => slime_option.slime)
    slime_options: SlimeOption[];

    static create(dto: any, userId: number) {
        const slime = new Slime();
        slime.title = dto.title;
        slime.media = dto.media;
        slime.mediaURL = dto.mediaURL;
        slime.description = dto.description;
        slime.saleSite = dto.saleSite;
        slime.userId = userId;
        return slime;
    }
}

@Entity()
export class SlimeOption extends BasicEntity {
    @Column()
    option: string;

    @ManyToOne(() => Slime, (slime) => slime.slime_options, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "slimePostId" })
    slime: Slime;

    @Column()
    slimeId: number;
}
