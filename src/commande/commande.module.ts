import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { CommandeController } from './commande.controller';
import { CommandeService } from './commande.service';
import { commandeEntity } from './entities/commande.entity';
import { commandeDetails } from './entities/commandeDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([commandeEntity,commandeDetails,ProductsEntity])] ,
  providers: [CommandeService],
  controllers: [CommandeController],
  exports: [CommandeService]
})
export class CommandeModule {}
