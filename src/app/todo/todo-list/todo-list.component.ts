import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoSelectors } from 'src/app/store/todo-selectors';
import { TodoModel } from '../types/todo';
import { AddTodo, ToggleCompleted } from 'src/app/store/todo-actions';

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
  @Select(TodoSelectors.todoItems) todoItems$!: Observable<TodoModel[]>;
  todoName: string = '';
  constructor(private store: Store) {}

  ngOnInit(): void {}

  trackById(index: number, item: TodoModel): number {
    return item.id;
  }

  addTodo(): void {
    this.store.dispatch(new AddTodo(this.todoName));
    this.todoName = '';
  }

  toggleItem(todo: TodoModel) {
    this.store.dispatch(new ToggleCompleted(todo));
  }
}
