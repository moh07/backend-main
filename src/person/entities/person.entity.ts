import { Entity, PrimaryGeneratedColumn , Column, OneToMany  } from "typeorm";
import { timestampEntity } from "src/generics/timestamp.entities";
import { userRoleEnum } from "src/enum/user.role.enum";
import { IsNumber } from "class-validator";
import { ProductsEntity } from "src/products/entities/products.entity";
import { devisEntity } from "src/devis/entities/devis.entity";
import { commandeEntity } from "src/commande/entities/commande.entity";


@Entity('person')
export class PersonEntity extends timestampEntity {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    firstname : string ;

    @Column()
    lastname: string ; 

    @Column()
    email : string ;

    @Column()
    phone : number ;

    @Column()
    address : string ;

    @Column({
        select : false 
    })
    password : string ;
    
   

    @Column({

        type : 'enum' , 
        enum : userRoleEnum , 
        default : userRoleEnum.USER
    })
    role :string ;
  
   @OneToMany(
        type => devisEntity,
        (devis) => devis.user,
       
      )
      devis: devisEntity[];

      @OneToMany(
        type => commandeEntity,
        (commande) => commande.user,
       
      )
      commande: commandeEntity[];
  
     
}
