import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { userRoleEnum } from "../user-roles-enum/user-role-enum";

export class CreateUserDto {
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string

    @IsEnum(userRoleEnum)
    role : string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
}
