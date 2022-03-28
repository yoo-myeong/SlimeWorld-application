import { IsOptional, IsString, IsUrl } from "class-validator";

export class SlimeCreateRequest {
    @IsString()
    readonly title: string;

    @IsString()
    readonly media: "video" | "image";

    @IsString()
    readonly description: string;

    @IsString()
    readonly saleSite: string;

    @IsOptional()
    readonly options?: Array<string>;

    @IsUrl()
    @IsOptional()
    mediaURL?: string;
}
