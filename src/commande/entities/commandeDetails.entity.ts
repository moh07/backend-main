import { ProductsEntity } from "src/products/entities/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { commandeEntity } from "./commande.entity";

@Entity('commandeDetails')
export class commandeDetails{

    
    @PrimaryGeneratedColumn()
    id: number;
   @ManyToOne((type) => commandeEntity, (commande) => commande.commandeDetails, {
      cascade: true,
      onDelete: 'CASCADE',
    })
    commande: commandeEntity;
    @Column()
    commandeId: number;

    @Column({ type: 'numeric', name : "quantité" })
    quantity: number; 
   

  @ManyToOne((type) => ProductsEntity, (product) => product.commandeDetails, {
      eager: true,
    })
   product: ProductsEntity;
    @Column()
    productId: number; //article
}