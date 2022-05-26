import { CreateDateColumn , UpdateDateColumn , DeleteDateColumn } from "typeorm";



export class timestampEntity {
    @CreateDateColumn({
        update : false 
    })
    createdAt : Date ; 

    @UpdateDateColumn() 
    updatedAt : Date ; 

    @DeleteDateColumn()
    deltedAt : Date ; 
}