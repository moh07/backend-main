import { commandeDetails } from "src/commande/entities/commandeDetails.entity";
import { devisEntity } from "src/devis/entities/devis.entity";
import { devisDetails } from "src/devis/entities/devisDetails.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {PersonEntity} from '../../person/entities/person.entity'


//import {devisEntity}from '../../devis/entities/devis.entity'

@Entity('products')
export class ProductsEntity {
       @Column()
       @PrimaryGeneratedColumn()
      
       
       id : number ;

       @Column()
       
       imagePrincipale : string ;

       @Column({nullable:true})
       image1 : string ;

       @Column({nullable:true})
       image2 : string ;

       @Column()
     categorie : string ;

     @Column()
     souscatégorie :string ;

     @Column()
     produit : string ;

     @Column()
     description : string ;

     @Column()
     price : number ;

     @Column({
       name : "quantity" ,
       default : "100"
     })
     quantity : number  ;
     

   /*  @ManyToOne(type=>devisEntity, (devis)=>devis.products,  {
      
      nullable: true,
      eager: true
    })
    @JoinColumn({name : 'idDevis'})
     Devis : devisEntity ; 
*/
    
     @OneToMany((type) => devisDetails, (devisDetails) => devisDetails.product, {})
     devisDetails: devisDetails[];
     @OneToMany((type) => commandeDetails, (commandeDetails) => commandeDetails.product, {})
     commandeDetails: commandeDetails[];
    
}