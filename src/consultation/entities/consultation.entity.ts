import { Column, Entity ,PrimaryGeneratedColumn} from "typeorm";


@Entity('consultation')
export class consultationEntity {
    @PrimaryGeneratedColumn()
    id : number ;

    @Column() 
    subject : string ;

    @Column()
    date : Date ; 


    @Column()
    lieu : string ; 

    @Column()
    details : string ;
}

