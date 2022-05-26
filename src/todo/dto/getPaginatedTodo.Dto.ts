
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class getPaginatedTodoDto {


    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    page : number ; 


    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    item : number ;

}