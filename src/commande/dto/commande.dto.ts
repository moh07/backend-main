import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class commandeDetailsDto{
    @IsNotEmpty()
    @IsNumber()
    quantity : number ;

    @IsNotEmpty()
    @IsNumber()
    productId : number;

    

 }
export class commandeDto {
    
    @IsNotEmpty()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => commandeDetailsDto)
   commandeDetails : commandeDetailsDto[]

   @IsOptional()
   userId: number; 
}