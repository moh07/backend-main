import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, PayloadTooLargeException, Post, Res, UnsupportedMediaTypeException, UploadedFile, UploadedFiles, UseGuards , UseInterceptors, ValidationPipe } from '@nestjs/common';
import { addProductDto } from './dto/addProduct.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { ProductsEntity } from './entities/products.entity';
import {ProductsService} from './products.service' ;
import {JwtAuthGuard} from '../person/guards/jwt-auth.guard' ;
import { Roles } from 'src/shared/roles.decorators';
import { userRoleEnum } from 'src/enum/user.role.enum';
import { JwtRolesAdminGuardGuard } from 'src/person/guards/jwt-roles.guard';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import {v4 as uuidv4} from 'uuid' ;
import { Observable, of } from 'rxjs';
import path = require('path');
import { extname } from 'path';
import { ParseJsonPipe } from 'src/shared/transform-stringify-into-json.pipe';


   

@Controller('products')
export class ProductsController {
    constructor(
        private  ProductsService : ProductsService
    ){}

    
   // @Roles(userRoleEnum.ADMIN)
    @Get() 
   async getAllProducts() : Promise<ProductsEntity[]>{
        return await this.ProductsService.getProducts() ;
    }
     

    @Get('image/:id')
    async getimage(@Param('id') fileId, @Res() res): Promise<any> {
      res.sendFile(fileId, { root: 'src/uploads'});
    }


  /*  @Roles(userRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
  @UseInterceptors(FileInterceptor('file' , storage))
    @Post('upload')
    async addProduct( 
        @Body()  Product : addProductDto,
        ) : Promise<ProductsEntity> {
    return await this.ProductsService.addProduct(Product) ;
        }
*/



        @Roles(userRoleEnum.ADMIN)
        @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Patch(':id')
    async updateProduct (
        @Param('id' , ParseIntPipe ) id ,
        @Body() Product : updateProductDto) : Promise<ProductsEntity> {
            return await this.ProductsService.updateProduct(id , Product) ; 
        }
   



        @Roles(userRoleEnum.ADMIN)
        @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Delete(':id')
    async softDeleteProduct (
       @Param('id' , ParseIntPipe)  id :number) {
        return await this.ProductsService.softDeleteProduct(id) ;
    }



    @Roles(userRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Get('recover/:id')
    async recoverProduct(
        @Param ('id' , ParseIntPipe) id : number ){
        return await this.ProductsService.restoreProduct(id)
        }




   @Roles(userRoleEnum.ADMIN)
    @UseGuards(JwtAuthGuard, JwtRolesAdminGuardGuard)
    @Post('Upload')
  @UseInterceptors(
    FileFieldsInterceptor([ // 👈  multiple files with different field names 
      { name: 'imagePrincipale', maxCount: 1, },
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: destinationEdit,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter
    }),

  )
  async addProduct(@Body("dto", new ParseJsonPipe(),ValidationPipe) addProductDto: addProductDto,
  @UploadedFiles() files: Express.Multer.File[] 
  ){
   console.log(files)
    if (files['imagePrincipale'])
    addProductDto.imagePrincipale = '/'  + files['imagePrincipale'][0]['filename'];
    
  if (files['image1'])
  addProductDto.image1 = '/'  + files['image1'][0]['filename'];
   
 
  if (files['image2'])
  addProductDto.image2 = '/'  + files['image2'][0]['filename'];
    

  return await this.ProductsService.addProduct(addProductDto, files);

} }

export const imageFileFilter = (req, file, callback) => {
    if (file.mimetype != "image/jpeg" && file.mimetype !=
      "image/png"
    ) {
      throw new UnsupportedMediaTypeException('Unsupported media type');
  
    } else if (file.size / 1024 / 1024 > 2) {
  
      throw new PayloadTooLargeException('Image too large, you can upload file up to 2 MB')
    }
    callback(null, true);
  };
export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };
function destinationEdit(req, file, cb) {
    const pathImg = path.resolve(process.env.UPLOADFILE);
  
    cb(null, pathImg);
  };


