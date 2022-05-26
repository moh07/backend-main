import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contactus')
export class contactusEntity {
@PrimaryGeneratedColumn()
id : number ; 

@Column() 
name : string ;

 @Column()
email : string ;

@Column() 
subject : string ;

@Column()
message : string ;
}