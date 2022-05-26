import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactusController } from './contactus.controller';
import { ContactusService } from './contactus.service';
import { contactusEntity } from './entities/contactus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([contactusEntity])] ,
  controllers : [ContactusController] ,
  providers: [ContactusService]
})
export class ContactusModule {}
