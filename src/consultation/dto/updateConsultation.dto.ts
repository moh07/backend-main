import { IsOptional, IsString } from "class-validator";

export class updateConsultationDto {
    @IsString()
    @IsOptional()
   subject : string ;

   @IsString()
   @IsOptional()
   date : Date ; 

   @IsString()
   @IsOptional()
   lieu : string ; 

   @IsString()
   @IsOptional()
   details : string ;
}