import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addProductDto } from './dto/addProduct.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { ProductsEntity } from './entities/products.entity';
const fs = require('fs');
const path = require('path');
@Injectable()
export class ProductsService {
    
    constructor( 
        @InjectRepository(ProductsEntity) 
        private productsRepository : Repository<ProductsEntity>
    ){}

    async findById(id : number) {
        const Product = await this.productsRepository.findOne(id) ;
        if(!Product) {
            throw new NotFoundException(`le produit d'id ${id} n'existe pas`) ;
        }
        return Product ; 
    }

   async getProducts() : Promise<ProductsEntity[]> {
       return await this.productsRepository.find() ; 
    } 

   async addProduct(Product : addProductDto,files:Express.Multer.File[]){
       return await this.productsRepository.save(Product).then( (res:ProductsEntity)=>{return  res}).catch(async (erreur)=>{ 

           if (files) {


        if (files['imagePrincipale'])
       await fs.promises.unlink(path.resolve(files['imagePrincipale'][0]['path']))
            console.log("File was deleted") // Callback

        if (files['image1']) {
             await fs.promises.unlink(path.resolve(files['image1'][0]['path']))
             console.log("File was deleted") // Callback
        }
        if (files['image2']) {
            await fs.promises.unlink(path.resolve(files['image2'][0]['path'])) ;
        }
    }
    else throw new InternalServerErrorException()
})}
    
    async updateProduct(id : number ,Product : updateProductDto) : Promise<ProductsEntity>{
        //on recupere la personne d'id id et on remplace les anciennes valeurs de cette personne par les nouvelles passées en paramétre
            const newProduct = await this.productsRepository.preload({
                id , 
                ...Product
            }) ; 
        // tester le cas ou la personne d'id id n'existe pas 
        if (!newProduct) {
            throw new NotFoundException(`le produit d'id ${id} n'existe pas`) ;
        }

        return await this.productsRepository.save(newProduct) ;
    }
    async deleteProduct(id: number){
     const deletedProduct= await this.findById(id)
        return await this.productsRepository.remove(deletedProduct) ;
    }
   // supprimer une personne mais pas physiquement 
    async softDeleteProduct(id : number) {
        return await this.productsRepository.softDelete(id) ;

    }

    async restoreProduct(id : number) {
        return await this.productsRepository.restore(id) ;
    }

}
