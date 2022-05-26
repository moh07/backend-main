import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { consultationEntity } from './entities/consultation.entity';

@Module({
  imports : [TypeOrmModule.forFeature([consultationEntity])],
  providers: [ConsultationService],
  controllers: [ConsultationController]
})
export class ConsultationModule {}
