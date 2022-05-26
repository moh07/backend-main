import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { userRoleEnum } from 'src/enum/user.role.enum';
import { Roles } from 'src/shared/roles.decorators';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { newPersonDto } from './dto/newPerson.dto';
import { sendEmailDto } from './dto/sendEmail.dto';
import { subscribePersonDto } from './dto/subscribePerson.dto';
import { PersonEntity } from './entities/person.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRolesAdminGuardGuard } from './guards/jwt-roles.guard';
import {PersonService} from './person.service' ;


@Controller('person')
export class PersonController {
    constructor(
        private  PersonService : PersonService

    ){
    }

   @Post()
    signUp(
        @Body() userData : subscribePersonDto
    ) : Promise<Partial< PersonEntity>> {
        return this.PersonService.signUp(userData);

    }
    @Post('login')
    login(
        @Body() credentials: LoginCredentialsDto
    )  { 
        
        return this.PersonService.login(credentials);

    }
    @Roles(userRoleEnum.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Get('get') 
    getAllPersons(){
        return this.PersonService.getAllPersons();
    }

    @Roles(userRoleEnum.USER)
    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Patch("/:id")
  async updateUser(
    @Param("id", ParseIntPipe) userId: number,
    @Body(ValidationPipe) newPersonDto: newPersonDto
   
  ) {
    return await this.PersonService.updateUser(userId , newPersonDto)
 
  
  }

  @Get('getbyid/:id')
  async getPerson(@Param('id', ParseIntPipe) id : number ,
 
  ) {
      return await this.PersonService.getPerson(id)
  }


  @Post('email')
 async sendEmail(
      @Body() mail: sendEmailDto 
      ) {
          
          return await this.PersonService.sendEmail(mail)
      }
}
