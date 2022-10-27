import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { TodoModel, TodoStateModel } from '../todo/types/todo';
import { AddTodo, DeleteTodo, ToggleCompleted } from './todo-actions';

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState {
  @Action(AddTodo)
  addTodo(ctx: StateContext<TodoStateModel>, { todoName }: AddTodo) {
    if (!todoName) return;
    const state = ctx.getState();
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

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoStateModel>, { id }: DeleteTodo) {
    const state = ctx.getState();
    const newTodos = state.todos.filter((todo) => todo.id !== id);
    ctx.patchState({
      todos: [...newTodos],
    });
  }
}
