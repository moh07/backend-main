import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendMsgDto } from './dto/sendMsgDto';
import { contactusEntity } from './entities/contactus.entity';

@Injectable()
export class ContactusService {
    constructor(
        @InjectRepository(contactusEntity)
        private contactusRepository : Repository<contactusEntity>
    ){}
    
    async sendMsg(message : sendMsgDto) : Promise<contactusEntity>{
        return await this.contactusRepository.save(message) ;

    }
}
