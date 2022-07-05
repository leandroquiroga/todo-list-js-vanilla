import './main.css';
import {TodoList} from './class/classes'
import { countTaskTotal, createTodoHTML } from './helpers/componentes';


export const todoList = new TodoList();

countTaskTotal();
todoList.todos.forEach(todo => createTodoHTML(todo));