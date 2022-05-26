import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/addTodo.Dto';
import { Todo } from './entities/todo.entity';
@Injectable()
export class TodoService {
    todos : Todo [] =[] ; 

    
    getTodos() : Todo[] {
        return this.todos ; 
    }
    addTodo(newTodo : AddTodoDto) : Todo{
        const {name , description} = newTodo ; 
        let id ; 
       if (this.todos.length) {
           id=this.todos[this.todos.length-1].id+1 ; 
       } else {
      id=1 ; }
      const todo = {
           id , 
           name , 
           description , 
           createdAt : new Date()
       };
       this.todos.push(todo) ; 
      return todo ;  
    }

    getTodoById(id : number) : Todo {
        const todo = this.todos.find((actualTodo) => actualTodo.id=== id);
        if (todo)
          return todo; 
       throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }

    deleteTodo(id : number) {
         //chercher un objet via son id
         const index = this.todos.findIndex((todo)=> todo.id===+id)  
         //utiliser la methode spice pour supprimer un todo s'il existe
         if(index>=0) {
             this.todos.splice(index,1) ;
         }
         //sinon declancher une erreur 
         else { 
             throw new NotFoundException(`le todo d'id ${id} n'existe pas`) 
         }
         return {
             message : `le todo d'id ${id} a été supprimé avec succés ` ,
             count : 1 
 
     };
    }
    modifierTodo( id : number, newTodo : Partial<Todo>) {
        const todo = this.getTodoById(id )
        todo.description = newTodo.description? newTodo.description : todo.description ;
        todo.name = newTodo.name? newTodo.name : todo.name ;
        return todo ;
    }
}
