import { IsString , IsNotEmpty,  IsDateString } from "class-validator";

export class consultationDto {
   

     @IsString()
     @IsNotEmpty()
    subject : string ;

    @IsDateString()
    @IsNotEmpty()
    date : Date ; 

    @IsString()
    @IsNotEmpty()
    lieu : string ; 

    @IsString()
    @IsNotEmpty()
    details : string ;
    
}