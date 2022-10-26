import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { TodoModel, TodoStateModel } from '../todo/types/todo';
import { AddTodo, ToggleCompleted } from './todo-actions';

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState {
  @Action(AddTodo)
  addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const todoName = action.todoName;
    const state = ctx.getState();
    if (!todoName) return;
    const newTodo: TodoModel = {
      id: state.todos.length + 1,
      title: todoName,
      isDone: false,
    };
    ctx.patchState({
      todos: [...state.todos, newTodo],
    });
  }

  @Action(ToggleCompleted)
  toggleCompleted(
    ctx: StateContext<TodoStateModel>,
    { todo }: ToggleCompleted
  ) {
    const state = ctx.getState();
    const newTodos = state.todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      }
      return item;
    });
    ctx.patchState({
      todos: [...newTodos],
    });
  }
}
