import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTodoDto {

    @MinLength(6 ,{
        message:"la taille minimale du nom est 6 caractéres" 
    })
    @IsString() 
    @IsNotEmpty()
    @MaxLength(25)
    name : string ; 


    @IsString() 
    @IsNotEmpty()
    description : string ; 
}