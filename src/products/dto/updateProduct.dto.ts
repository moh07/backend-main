import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class updateProductDto{
    
       
       @IsOptional()
        @IsString()
       image : string ;
      

   
     @IsOptional()
     @IsString()
     produit : string ;
     
     @IsOptional()
     @IsString()
     description : string ;

     @IsOptional()
     @IsNumber()
     quantity : number ;
}