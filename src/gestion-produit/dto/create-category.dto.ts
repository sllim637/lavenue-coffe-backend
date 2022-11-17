import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class CreateCategoryDTO {
    @ApiProperty()
    @IsString()
    categoryName : string
    @IsString()
    @IsOptional()
    @ApiProperty()
    categoryImage: string
}