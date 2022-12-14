import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class CreateCategoryDTO {
    @IsString()
    categoryName : string
    @IsString()
    @IsOptional()
    categoryImage: string
}