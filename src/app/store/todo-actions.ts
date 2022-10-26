import { TodoModel } from '../todo/types/todo';

export class AddTodo {
  static readonly type = '[Todo] Add Todo';
  constructor(public todoName: string) {}
}

export class ToggleCompleted {
  static readonly type = '[Todo] Toggle Completed';
  constructor(public todo: TodoModel) {}
}
