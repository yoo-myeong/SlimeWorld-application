import { Slime } from "./../../../entity/slime/slime.entity";
export class SlimeCreateParam {
    title: string;
    media: "video" | "image";
    description: string;
    saleSite: string;
    mediaURL: string;

    public toEntity(userId: number) {
        return Slime.create(this, userId);
    }
}
