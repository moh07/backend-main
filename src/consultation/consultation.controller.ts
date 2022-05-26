import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { consultationDto } from './dto/consultation.dto';
import { updateConsultationDto } from './dto/updateConsultation.dto';
import { consultationEntity } from './entities/consultation.entity';

@Controller('consultation')
export class ConsultationController {

    constructor(
        private consultationService : ConsultationService
    ){
    }

    @Post() 
    consultation(
        @Body() consultation : consultationDto
    ) : Promise<consultationEntity>{
        return this.consultationService.consultation(consultation) ;
    }

    @Patch(':id') 
    async updateConsultation (
        @Param('id' , ParseIntPipe ) id ,
        @Body() updatedConsultation : updateConsultationDto 
     ) : Promise<consultationEntity>{
         return await this.consultationService.modifierConsultation(id ,updatedConsultation) ;
     }

     @Delete(':id') 
     async annulerConsultation(
        @Param('id' , ParseIntPipe ) id 
     ){
        return await this.consultationService.annulerConsultation(id) ;
     } 
}
