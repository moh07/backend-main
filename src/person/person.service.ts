import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {PersonEntity} from './entities/person.entity' ; 
import {Repository} from 'typeorm' ;
import { InjectRepository } from '@nestjs/typeorm';
import { subscribePersonDto } from './dto/subscribePerson.dto';

import * as bcrypt from 'bcrypt' ;
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { newPersonDto } from './dto/newPerson.dto';
import { MailerService } from '@nestjs-modules/mailer';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { sendEmailDto } from './dto/sendEmail.dto';
import { devisEntity } from 'src/devis/entities/devis.entity';
@Injectable()
export class PersonService {
    constructor( 
        @InjectRepository(PersonEntity) 
        private personRepository : Repository<PersonEntity> ,
        @InjectRepository(devisEntity)
        private devisRepository : Repository<devisEntity>,
        private jwtService : JwtService,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        


        
    ){}

  async signUp(userData:subscribePersonDto) : Promise<Partial <PersonEntity>> {
      const user = this.personRepository.create({
          ...userData
      })
      
      console.log(user)
      user.password= await bcrypt.hash(user.password , 10) 
      try{
     await this.personRepository.save(user) ;
      } catch (e) {
          throw new ConflictException('le userName et le password doivent etre uniques')
      }

      return { 
          id : user.id, 
          lastname :user.lastname, 
          email : user.email, 
          role : user.role
      } ;
  }
  async validatePassword(password: string, pass2: string): Promise<boolean> {
    const hash = bcrypt.compare(password, pass2);
    return hash;
  }
  async login(credentials : LoginCredentialsDto) {
      const {email, password} =credentials ; 
      const user = await this.personRepository.createQueryBuilder("user").select(["user.email", "user.password" , "user.role" , "user.firstname","user.lastname","user.phone","user.id","user.address" ] )
      .where("user.email=:email " , {email}) 
      .getOne() ;
      console.log("user : ", user)
      if(!user) 
      throw new NotFoundException("l' email ou le mot de passe est incorrect") ; 
     
      //const hashedPassword = await bcrypt.hash(password ,10) ;
      if(await this.validatePassword(password, user.password)) {
        delete user.password 
        const payload  = {...user }
          /*  email : user.email, 
            lastname : user.lastname , 
            role : user.role*/
        
        const jwt = await this.jwtService.sign(payload) ;
        payload['jwt'] = jwt 
        return  {payload}  
          
      }
      else {
        throw new NotFoundException("le mot de passe est incorrect") ; 
      }

  }

  async getPerson(id : number){
    return await this.personRepository.findOne(id) ;
  }

  async getAllPersons() : Promise<Partial < PersonEntity[]>>{
   return this.personRepository.find() ;
  }

  async updateUser(userId : number , newPersonDto : newPersonDto){
    const user = this.personRepository.create({
      ...newPersonDto
  })
  
  console.log("aa")
  user.password= await bcrypt.hash(user.password , 10) 
  try{
 await this.personRepository.update(userId , user) ;
  } catch (e) {
    console.log(e)
      throw new ConflictException('le userName et le password doivent etre uniques')
  }
  }

  async sendEmail(mail : sendEmailDto) {
  
   return await this.mailerService.sendMail({
      from: process.env.SMTP_USER,
      to: mail.email ,


      subject: "Nouvelle commande ",
      template: '/index',
      context: {
          message:  mail.message,
         
      },
  }).then(async ()=>{
  return await this.devisRepository.update(mail.idDevis,{etat:true}) .then(result => {
      if (result.affected !== 0) {
        return {
          message: 'devis traitée !',
        };
      } else {
        throw new NotFoundException('not found');
      }
    })})
     
  }
}
