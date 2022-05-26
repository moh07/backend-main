import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { userRoleEnum } from 'src/enum/user.role.enum';
import { JwtAuthGuard } from 'src/person/guards/jwt-auth.guard';
import { JwtRolesAdminGuardGuard } from 'src/person/guards/jwt-roles.guard';
import { Roles } from 'src/shared/roles.decorators';
import { CommandeService } from './commande.service';
import { commandeDto } from './dto/commande.dto';
import { updateCommandeDto } from './dto/updateCommandeDto.dto';
import { commandeEntity } from './entities/commande.entity';

@Controller('commande')
export class CommandeController {
        constructor(
            private commandeService : CommandeService
        ){}
     
        @Roles(userRoleEnum.USER)
        @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
       @Post('add') 
         async validerCommande(
             @User() person,
             @Body(ValidationPipe) commande : commandeDto
             
         ){
             console.log(commande)
            return await this.commandeService.validerCommande(commande,person) ;
         }


         
         @Roles(userRoleEnum.ADMIN)
         @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
         @Get('getAll') 
        async getAllCommandes( ){
            
             return await this.commandeService.getAllCommandes();
         }
     
         @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
         @Get('getCommandeDetails/:id') 
        async getDCommandeDetails(@Param('id', ParseIntPipe) idCommande: number){
            
             return await this.commandeService.getCommandeDetails(idCommande);
         }
     
     
        
         
         @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
         @Get('get') 
        async getCommande(
         @User() person
        ){
            console.log(person)
             return await this.commandeService.getCommande(person);
         }

         @Roles(userRoleEnum.USER)
         @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
     @Patch('updateCommande/:id')
     async updateCommande (
         @Param('id' , ParseIntPipe ) id ,
         @Body() commande : updateCommandeDto) : Promise<commandeEntity> {
             return await this.commandeService.updateCommande(id , commande) ; 
         }
     
        
     
}
