import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ transform: 'translateY(0px)', opacity: 1 })),
      transition(':enter', [
        style({
          transform: 'translateY(25px)',
          opacity: 0,
        }),
        animate(300),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todoName: string = '';
  todos: TodoModel[] = [];
  constructor() {}

  ngOnInit(): void {}

  addTodo(): void {
    if (!this.todoName) return;
    const newTodo: TodoModel = {
      id: this.todos.length + 1,
      title: this.todoName,
      isDone: false,
    };
    this.todos.push(newTodo);
    this.todoName = '';
    return;
  }

  toggleItem(todo: TodoModel) {
    const index = this.todos.findIndex((i) => i.id === todo.id);
    this.todos[index].isDone = !this.todos[index].isDone;
  }
}
