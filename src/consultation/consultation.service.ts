import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { consultationDto } from './dto/consultation.dto';
import { updateConsultationDto } from './dto/updateConsultation.dto';
import { consultationEntity } from './entities/consultation.entity';

@Injectable()
export class ConsultationService {
constructor (
    @InjectRepository(consultationEntity)
    private consultationRepository : Repository<consultationEntity>
){}

async consultation(consultation: consultationDto) : Promise<consultationEntity> {
    return await this.consultationRepository.save(consultation) ;
}

async modifierConsultation(id : number ,consultation : updateConsultationDto) : Promise<consultationEntity> {
    const newConsultation = await this.consultationRepository.preload({
        id , 
        ...consultation
    })
    if(!newConsultation) {
        throw new NotFoundException(`la consultation d'id ${id} n'existe pas`) ;
    }
    else {
        return await this.consultationRepository.save(newConsultation) ;
    }

}

async annulerConsultation(id : number) {
    const deletedConsultation = await this.consultationRepository.findOne(id) 
    return await this.consultationRepository.remove(deletedConsultation) ;
}

}
