import { timestampEntity } from "src/generics/timestamp.entities";
import { PersonEntity } from "src/person/entities/person.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { commandeDetails } from "./commandeDetails.entity";

@Entity('commande')
export class commandeEntity extends timestampEntity{
    @PrimaryGeneratedColumn()
    id : number ;
 
    

   @OneToMany((type) => commandeDetails, (commandeDetails) => commandeDetails.commande, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],

    eager: true,
  })
  commandeDetails: commandeDetails[];

  @ManyToOne(
    type => PersonEntity,
    (person) => person.commande,
    
  )
  user: PersonEntity;

  
  @Column() 
  userId : number ;

  @Column()
  etat : boolean ; 
 
}