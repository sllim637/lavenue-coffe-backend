import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string


}
