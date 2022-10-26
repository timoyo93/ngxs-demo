import { Selector } from '@ngxs/store';
import { TodoModel, TodoStateModel } from '../todo/types/todo';
import { TodoState } from './todo-state';

export class TodoSelectors {
  @Selector([TodoState])
  static todoItems(state: TodoStateModel): TodoModel[] {
    return state.todos;
  }
}
