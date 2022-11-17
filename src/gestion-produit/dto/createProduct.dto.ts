import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, MaxLength } from "class-validator"


export class CreateProductDTO{
    @ApiProperty()
    @IsString()
    productName : string
    @IsString()
    @MaxLength(20)
    @ApiProperty()
    productImage : string
    @IsNumber()
    @ApiProperty()
    productPrice :number
    @IsString()
    @ApiProperty()
    devise : string
    @IsNumber()
    categoryId : number
}