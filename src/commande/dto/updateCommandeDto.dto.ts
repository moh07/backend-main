import { IsNumber, IsOptional } from "class-validator";


export class updateCommandeDto {
    @IsOptional()
    @IsNumber()
    quantity : number ;

    @IsOptional()
    @IsNumber()
    productId : number;

}