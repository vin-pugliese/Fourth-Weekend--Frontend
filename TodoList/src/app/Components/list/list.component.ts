import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Model/Todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos: Todo[] = [];
  inputTodo :string ="";

  constructor() { }

  ngOnInit(): void {
    this.todos = [
      {
        content: 'Esercizio Angular',
        completed: false
      },
      {
        content: 'Esercizio spring-react',
        completed: true
      },
      {
        content: 'Esercizio HTML/CSS/JS',
        completed: true
      }
    ]
  }

  toggleDone(id: number){
     this.todos.map((v, i) =>{
       if (i == id) v.completed = !v.completed;
     })
  }

  deleteTodo(id: number){
    this.todos = this.todos.filter( (v, i)=> i !== id);
  }

  addTodo(){
    this.todos.push({
      content: this.inputTodo,
      completed: false
    });

    this.inputTodo = "";
  }

}
