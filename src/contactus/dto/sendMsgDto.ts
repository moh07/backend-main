import { IsNotEmpty, IsString } from "class-validator";

export class sendMsgDto {
   

@IsString()
@IsNotEmpty()
name : string ;

@IsString()
@IsNotEmpty()
email : string ;

@IsString()
@IsNotEmpty()
subject : string ;

@IsString()
@IsNotEmpty()
message : string ;
}