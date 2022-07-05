
export class TodoList {
  
  constructor() {
    this.loadTodoLocalStorage();
  };
  // Create a new todo
  newTodo(todo) {
    this.todos.push(todo);
    this.saveTodoLocalStorage();
  };
  // Delete a todo by ID
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodoLocalStorage();
  };
  // Complete todo
  toggleTodo(id) {
    for (let todo of this.todos) {
      if (todo.id === id) {
        todo.complete = !todo.complete;
        this.saveTodoLocalStorage();
        break;
      };
    };
  };
  // Delete all todo
  deleteAllTodo() {
    this.todos = this.todos.filter(todo => !todo.complete);
    this.saveTodoLocalStorage();
  };
  // Saved todo of the localStorage
  saveTodoLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos))
  }
  // Loaded todo of the localStorage
  loadTodoLocalStorage() {
    this.todos = (localStorage.getItem('todo'))
      ? JSON.parse(localStorage.getItem('todo'))
      : [];
  };
};