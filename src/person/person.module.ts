import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import {PersonEntity} from './entities/person.entity' ; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { DevisModule } from 'src/devis/devis.module';
import { DevisService } from 'src/devis/devis.service';
import { devisEntity } from 'src/devis/entities/devis.entity';
import { commandeEntity } from 'src/commande/entities/commande.entity';



@Module({
  imports : [  TypeOrmModule.forFeature([PersonEntity,devisEntity]),
  PassportModule.register({defaultStrategy : 'jwt'} ),
  JwtModule.register({secret : 'arijSecretKey' , 
  signOptions : {
    expiresIn : 3600 
  } 
}),

 
],
 
  controllers: [PersonController],
  providers: [PersonService , JwtStrategy ]
})
export class PersonModule {}
