import { Body, Get, HttpCode, JsonController, OnUndefined, Post, Req, UseBefore } from "routing-controllers";
import { UsersService } from "../../service/users/users.service";
import { Service } from "typedi";
import { SignupReqeust } from "./dto/signupRequest";
import passport from "../../utils/passport";

@Service()
@JsonController("/auth")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @HttpCode(201)
    @Post("/signup")
    public async singup(@Body() dto: SignupReqeust) {
        try {
            return this.usersService.create(dto);
        } catch (e) {
            return e.message;
        }
    }

    @HttpCode(200)
    @UseBefore(passport.authenticate("local"))
    @Post("/login")
    public async login(@Req() req: any) {
        const { username, position } = req.user;
        return { username, position };
    }

    @HttpCode(200)
    @OnUndefined(401)
    @Get("/me")
    public async me(@Req() req: any) {
        return req.user;
    }

    @OnUndefined(204)
    @Post("/logout")
    public async logout(@Req() req: any) {
        return req.logout();
    }
}
