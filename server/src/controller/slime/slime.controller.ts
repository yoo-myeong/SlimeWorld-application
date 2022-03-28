import { SlimeCreateRequest } from "./dto/createRequest";
import { SlimeService } from "./../../service/slime/slime.service";
import "express-async-errors";
import { Service } from "typedi";
import {
    Authorized,
    Body,
    Delete,
    ForbiddenError,
    Get,
    HttpCode,
    JsonController,
    Param,
    Post,
    Req,
    UseBefore,
} from "routing-controllers";
import { upload } from "../../utils/multer";

@Service()
@JsonController("/slime")
export class SlimeController {
    constructor(private slimeService: SlimeService) {}

    @HttpCode(201)
    @Get()
    public async get() {
        try {
            return await this.slimeService.get();
        } catch (e) {
            throw new Error(e);
        }
    }

    @HttpCode(200)
    @UseBefore(upload.single("image"))
    @Authorized()
    @Post("/image")
    public async createWithImage(@Body() dto: SlimeCreateRequest, @Req() req: any) {
        const userId = req.user.id;
        dto.mediaURL = req.file["location"];
        try {
            const slime = await this.slimeService.create(dto, userId);
            return {
                postId: slime.id,
            };
        } catch (e) {
            throw new Error(e);
        }
    }

    @HttpCode(200)
    @Authorized()
    @Post("/video")
    public async createWithVideo(@Body() dto: SlimeCreateRequest, @Req() req: any) {
        const userId = req.user.id;
        try {
            const slime = await this.slimeService.create(dto, userId);
            return {
                postId: slime.id,
            };
        } catch (e) {
            throw new Error(e);
        }
    }

    @HttpCode(204)
    @Authorized()
    @Delete("/:id")
    public async delete(@Param("id") id: number, @Req() req: any) {
        const userId = req.user.id;
        try {
            return await this.slimeService.delete(id, userId);
        } catch (e) {
            throw new ForbiddenError();
        }
    }

    @HttpCode(201)
    @Get("/tag/:id")
    public async getTags(@Param("id") id: number) {
        try {
            return await this.slimeService.getTags(id);
        } catch (e) {
            throw new Error(e);
        }
    }
}
