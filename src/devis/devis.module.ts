import { Module } from '@nestjs/common';
import { DevisService } from './devis.service';
import { DevisController } from './devis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { devisEntity } from './entities/devis.entity';
import { devisDetails } from './entities/devisDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([devisEntity,devisDetails])] ,
  providers: [DevisService],
  controllers: [DevisController] , 
  exports: [DevisService]
})
export class DevisModule {}
