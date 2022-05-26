import { Injectable, InternalServerErrorException, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from 'src/person/entities/person.entity';
import { Repository } from 'typeorm';
import { devisDto } from './dto/devis.dto';
import { devisEntity } from './entities/devis.entity';

@Injectable()
export class DevisService {
    constructor(
      @Optional()
        @InjectRepository(devisEntity)
        private devisRepository : Repository<devisEntity>
    ){}

    async demanderDevis(devis : devisDto , person)  {
      console.log(person)
      if(person?.id){
        devis.userId=person.id
      }
      
        return await this.devisRepository.save(devis ).then(()=>{return "quote created "}).catch((error)=> {console.log(error)
          throw new InternalServerErrorException()})
    }

    async getDevis(user): Promise<devisEntity[]> {
     
      return await this.devisRepository.find({userId:user?.id});
    }

    async getAllDevis(): Promise<devisEntity[]>{
      return await this.devisRepository.find({relations:["user"]})
    }
    async deleteDevis(id : number)  {
        return await this.devisRepository.delete(id).then((res)=>{ if (res.affected !== 0) {
            return {
              message: 'quote deleted !',
            };
          } else {
            throw new NotFoundException('Not found');
          }}).catch((error)=> {
              console.log(error.response)
              if (error?.response?.error === 'Not Found') {
            //foreign_key_violation
            throw new NotFoundException('Not found');
          } else {
            throw new InternalServerErrorException();
          }})
    }

    async getDevisDetails(idDevis: number) {
      return await this.devisRepository.findOne(idDevis);
    }

    async updateDevis(id : number , devis:devisEntity){
      return await this.devisRepository.update(id,devis)
    }
    
}
