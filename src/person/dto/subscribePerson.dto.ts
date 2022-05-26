import {IsEmail, IsNotEmpty , IsNumber, IsString, MinLength } from 'class-validator' ;


export class subscribePersonDto{
     @IsNotEmpty()
     @IsString()
    firstname : string ;

    @IsString()
    @IsNotEmpty()
    lastname: string ; 

    @IsEmail()
    @IsNotEmpty()
    email : string ;
    
    @IsNotEmpty()
    phone : number ;

    @IsNotEmpty()
    @IsString()
    address : string ;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)   
    password : string ;

    
}