import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class sendEmailDto{



    @IsNotEmpty()
    @IsString()
message : string

@IsString()
@IsNotEmpty()
email : string ;
    
@IsNotEmpty()
@IsNumber()
idDevis : number ;
}
