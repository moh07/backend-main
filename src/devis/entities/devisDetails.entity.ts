import { ProductsEntity } from "src/products/entities/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { devisEntity } from "./devis.entity";

 @Entity('devisDetails')
export class devisDetails {

    @PrimaryGeneratedColumn()
    id: number;
   @ManyToOne((type) => devisEntity, (devis) => devis.devisDetails, {
      cascade: true,
      onDelete: 'CASCADE',
    })
    devis: devisEntity;
    @Column()
    devisId: number;

    @Column({ type: 'numeric', name : "quantité" })
    quantity: number; //quantité
   

  @ManyToOne((type) => ProductsEntity, (product) => product.devisDetails, {
      eager: true,
    })
   product: ProductsEntity;
    @Column()
    productId: number; //article

}