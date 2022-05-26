import { Type } from "class-transformer";
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { devisDetails } from "../entities/devisDetails.entity";
export class devisDetailsDto {
   

    @IsNotEmpty()
    @IsNumber()
    quantity : number ;

    @IsNotEmpty()
    @IsNumber()
    productId : number;

    

 }
export class devisDto {
    
    @IsNotEmpty()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => devisDetailsDto)
   devisDetails : devisDetailsDto[]

   @IsOptional()
   userId: number; 
}


