import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignupReqeust {
    @IsEmail()
    readonly email: string;

    @MinLength(8)
    @MaxLength(20)
    readonly password: string;

    @MinLength(1)
    readonly username: string;

    @IsString({ groups: ["seller", "buyer"] })
    readonly position: "seller" | "buyer";
}
