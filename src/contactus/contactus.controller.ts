import { Body, Controller, Post } from '@nestjs/common';
import { ContactusService } from './contactus.service';
import { sendMsgDto } from './dto/sendMsgDto';
import { contactusEntity } from './entities/contactus.entity';

@Controller('contactus')
export class ContactusController {

    constructor(
        private contactusService : ContactusService
    ){}

    @Post() 
    sendMsg(
        @Body() message : sendMsgDto 
    ) : Promise<contactusEntity> {
        return this.contactusService.sendMsg(message) ;
    }
}
