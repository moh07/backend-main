import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { userRoleEnum } from 'src/enum/user.role.enum';
import { JwtAuthGuard } from 'src/person/guards/jwt-auth.guard';
import { JwtRolesAdminGuardGuard } from 'src/person/guards/jwt-roles.guard';
import { Roles } from 'src/shared/roles.decorators';
import { DevisService } from './devis.service';
import { devisDto } from './dto/devis.dto';

@Controller('devis')
export class DevisController {
   constructor(
       private devisService : DevisService
   ){}

   @Roles(userRoleEnum.USER)
   @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
  @Post('add') 
    async demanderDevis(
        @User() person,
        @Body(ValidationPipe) devis : devisDto
        
    ){
        console.log(devis)
       return await this.devisService.demanderDevis(devis,person) ;
    }
    @Roles(userRoleEnum.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Get('getAll') 
   async getAllDevis( ){
       
        return await this.devisService.getAllDevis();
    }

    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Get('getDevisDetails/:id') 
   async getDevisDetails(@Param('id', ParseIntPipe) idDevis: number){
       
        return await this.devisService.getDevisDetails(idDevis);
    }


    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Get('get') 
   async getDevis(
    @User() person
   ){
       console.log(person)
        return await this.devisService.getDevis(person);
    }

    @Roles(userRoleEnum.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Delete('/delete/:id')
    async deleteInvoice(@Param('id', ParseIntPipe) invoiceID: number) {
      return await this.devisService.deleteDevis(invoiceID);
    }

    
}


