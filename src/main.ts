import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Request , Response} from 'express' ;
import * as morgan from 'morgan' ; 
import { DurationInterceptor } from './interceptors/duration.interceptor';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv' ;
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';


dotenv.config();

async function bootstrap() {
  var path = require('path');
 
  const app = await NestFactory.create<NestExpressApplication>(AppModule );
  const corsOptions ={
    origin : ['http://localhost:4001'] 

  }
  app.enableCors(corsOptions)
  app.use(morgan('dev'));
 
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.useStaticAssets(path.resolve(process.env.UPLOADFILE));
 /* app.useGlobalPipes(new ValidationPipe({
    whitelist : true ,
    forbidNonWhitelisted : true 
  }))*/
  app.useGlobalInterceptors(new DurationInterceptor()) ;
  await app.listen(4000);
}
bootstrap();
