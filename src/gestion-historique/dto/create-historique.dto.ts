import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateHistoriqueDTO{
    commands : Command[]
    @IsNotEmpty()
    date : Date
}
class Command {
    @IsNumber()
    @IsNotEmpty()
    productId : number
    @IsNumber()
    @IsNotEmpty()
    quanity : number
}