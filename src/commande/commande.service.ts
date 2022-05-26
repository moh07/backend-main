import { Injectable, InternalServerErrorException, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import { commandeDto } from './dto/commande.dto';
import { updateCommandeDto } from './dto/updateCommandeDto.dto';
import { commandeEntity } from './entities/commande.entity';
import { commandeDetails } from './entities/commandeDetails.entity';

@Injectable()
export class CommandeService {
    constructor(
        @Optional()
          @InjectRepository(commandeEntity)
          private commandeRepository : Repository<commandeEntity>,
          @InjectRepository(ProductsEntity)
          private productsRepository : Repository<ProductsEntity>
          
      ){}


      async updateProduct(productId : number , quantity : number) {
          const product = await this.productsRepository.createQueryBuilder("product").select(["product.id","product.quantity"])
          .where("product.id=:productId",{productId}).getOne();
          await this.productsRepository.update(productId,{quantity:product.quantity-quantity});
      }



      async validerCommande(commande : commandeDto , person)  {
        console.log(person)
        if(person?.id){
          commande.userId=person.id
        }
        commande.commandeDetails.map(obj=>{
            this.updateProduct(obj.productId,obj.quantity)
        })
          return await this.commandeRepository.save(commande ).then(()=>{return "commande validée "}).catch((error)=> {console.log(error)
            throw new InternalServerErrorException()})
      }
  
      async getCommande(user): Promise<commandeEntity[]> {
     
        return await this.commandeRepository.find({userId:user?.id});
      }

      async getAllCommandes(): Promise<commandeEntity[]>{
        return await this.commandeRepository.find({relations:["user"]})
      }

      async getCommandeDetails(idCommande: number) {
        return await this.commandeRepository.findOne(idCommande);
      }
  
      async updateCommande(id : number ,commande : updateCommandeDto) : Promise<commandeEntity>{
            const newCommande = await this.commandeRepository.preload({
                id , 
                ...commande
            }) ; 
        if (!newCommande) {
            throw new NotFoundException(`la commande d'id ${id} n'existe pas`) ;
        }

        return await this.commandeRepository.save(newCommande) ;
    }
      




}
