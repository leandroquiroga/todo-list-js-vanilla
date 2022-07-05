export class Todo{
  
  constructor(task) {

    this.task     = task;
    this.id       = Math.random().toString(36).slice(2);
    this.complete = false;
    this.create   = new Date();
  }
}