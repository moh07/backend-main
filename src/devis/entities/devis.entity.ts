import { timestampEntity } from "src/generics/timestamp.entities";
import { PersonEntity } from "src/person/entities/person.entity";
import { Column, Entity , ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductsEntity} from'../../products/entities/products.entity';
import { devisDetails } from "./devisDetails.entity";

@Entity('devis')
export class devisEntity extends timestampEntity {

    @PrimaryGeneratedColumn()
    id : number ;
 
    

  /*@OneToMany(type=>ProductsEntity, (product)=>product.Devis,{
        nullable: true,
        cascade: true
      })
   products: ProductsEntity[];
   */
   @OneToMany((type) => devisDetails, (devisDetails) => devisDetails.devis, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],

    eager: true,
  })
  devisDetails: devisDetails[];

  @ManyToOne(
    type => PersonEntity,
    (person) => person.devis,
    
  )
  user: PersonEntity;

  
  @Column() 
  userId : number ;

  @Column()
  etat : boolean ; 
 
}