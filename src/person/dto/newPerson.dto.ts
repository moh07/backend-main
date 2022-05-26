import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class newPersonDto {

    

    @IsString()
    @IsOptional()
    firstname : string ;

    @IsString()
    @IsOptional()
    lastname : string ;

    @IsNumber()
    @IsOptional()
    phone : number ;

    @IsString()
    @IsOptional()
    email : string ;

    @IsString()
    @IsOptional()
    address : string ;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password : string ;

   


    
}