import { Body, Controller , Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { Todo } from 'src/todo/entities/todo.entity';
import { getPaginatedTodoDto } from './dto/getPaginatedTodo.Dto';
import { AddTodoDto } from './dto/addTodo.Dto';
import {TodoService} from './todo.service' ; 
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion.pipe';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';


@Controller('todo')
export class TodoController {
    TodoService: any;
    constructor ( 
        private todoService : TodoService
    ) {}
    
    @Get()
    getTodos(
        @Query() mesQueryParams : getPaginatedTodoDto
    ) : Todo[] 
    {
        
        return this.todoService.getTodos() ;
    }

     @Get('/:id') 
     getTodoById(
         @Param('id' , new  ParseIntPipe({
             errorHttpStatusCode : HttpStatus.NOT_FOUND 
         })) id 
     ){
       return this.todoService.getTodoById(id) ;
     }

    @Post()
    addTodo(
        @Body() newTodo : AddTodoDto  
    ) : Todo
    {
        
       return this.todoService.addTodo(newTodo) ; 
    }


    @Put(':id')
    modifierTodo(
        @Param('id' , ParseIntPipe) id , 
        @Body () newTodo : Partial <AddTodoDto>
    ){
       return this.todoService.modifierTodo(id , newTodo)
    }
    //supprimer un objet via son id
    @Delete(':id')
    DeleteTodo(
        @Param('id' , ParseIntPipe) id
    ){
       
       return this.todoService.deleteTodo(id) ;
} 
  @Post('pipe') 
  testPipe(
      @Body(UpperAndFusionPipe) data
  ) {
      return data 
  }

  

}
