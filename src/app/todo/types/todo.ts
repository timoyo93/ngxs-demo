export interface TodoModel {
  id: number;
  title: string;
  isDone: boolean;
}

export interface TodoStateModel {
  todos: TodoModel[];
}
