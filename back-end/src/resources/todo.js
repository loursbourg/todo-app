export class TodoResource {
  constructor(todo) {
    this.id = todo._id;
    this.title = todo.title;
    this.completed = todo.completed;
    this.created_at = todo.created_at;
    this.updated_at = todo.updated_at;
  }
}
