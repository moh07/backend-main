
import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './midlwares/first.middleware';
import { Logger } from './midlwares/Logger.Midlware';
import { TodoModule } from './todo/todo.module';
import { PersonModule } from './person/person.module';
import { ProductsModule } from './products/products.module';
import { ContactusModule } from './contactus/contactus.module';
import { ConsultationModule } from './consultation/consultation.module';
import { DevisModule } from './devis/devis.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv' ;
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommandeService } from './commande/commande.service';
import { CommandeModule } from './commande/commande.module';



@Module({
  imports: [
    TodoModule ,
    ConfigModule.forRoot({
      isGlobal : true 
    }) , 
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get('SMTP_HOST'),
        port: config.get('SMTP_PORT'),
        ignoreTLS: false,
        secure: true,
        auth: {
          user: config.get("SMTP_USER"),
          pass: config.get("SMTP_PASSWORD"),
        },

      },

      defaults: {
        from: '"No Reply" ' + config.get("SMTP_PASSWORD") + '',
      },
      template: {
        dir: process.cwd() + '/src/templates/',

        adapter: new HandlebarsAdapter(),
        options:  {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  }), 

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_authentif',
      entities: ["dist/**/*.entity.js"],
      synchronize: false,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    }), PersonModule, ProductsModule, ContactusModule, ContactusModule, ConsultationModule, DevisModule, CommandeModule
  ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) : any {
    consumer.apply(FirstMiddleware ).forRoutes({
      path:'todo' , method : RequestMethod.GET
    } ,
    { path:'todo*' , method : RequestMethod.DELETE}
    ) 
    .apply(Logger).forRoutes('') 
    //.apply(HelmetMiddleware).forRoutes('') ;
  }
  
}
