import { Http } from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Todo, TodoStatus } from './models';
import { generateId } from './mock';
import { TodoApiService } from './todo-api.service';
import { StorageApiService } from './storage-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor(@Inject('api') private api: string, private http: Http) { }

  ngOnInit(): void {
    // const data = JSON.parse(localStorage.getItem('todoList'));
    // this.todoList = data.map(p => new Todo({id: p.id, name: p.name, status: p.status}))
    this.getTodoWithHttp().subscribe(data => this.todoList = data.json().map(p => new Todo({ id: p.id, name: p.name, status: p.status })))
  }

  addTodoWithHttp(todo: Todo) {
    this.http.post(`${this.api}/todos/`, todo).subscribe();
  }
  getTodoWithHttp() {
    return this.http.get(`${this.api}/todos/`)
  }
  updateTodoWithHttp(todo: Todo) {
    this.http.put(`${this.api}/todos/${todo.id}`, todo).subscribe()
  }
  deleteTodoWithHttp(todo: Todo) {
    this.http.delete(`${this.api}/todos/${todo.id}`).subscribe()
  }

  // 過濾條件
  filterCondition: TodoStatus | undefined;

  todoList: Todo[] = [

  ];

  saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList))
  }

  creatNewTodo(input: HTMLInputElement) {
    let inputText = input.value;

    if (inputText === null || inputText === undefined || inputText.match(/^[ ]*$/)) {
      return
    }

    const todo = new Todo({
      //確保id不重複
      id: Math.max(0, ...this.todoList.map(p => p.id)) + 1,
      name: inputText,
      status: TodoStatus.Active
    });
    this.todoList.push(todo);
    inputText = '';
    this.saveToLocalStorage();
    this.addTodoWithHttp(todo);
  }

  updateTodo(todo: Todo, editTodo: HTMLInputElement) {
    todo.name = editTodo.value;
    todo.selected = false;
    this.saveToLocalStorage();
    this.updateTodoWithHttp(todo);
  }

  switchStatus(todo: Todo) {
    todo.switchStatus();
    this.saveToLocalStorage();
    this.updateTodoWithHttp(todo);
  }

  delectTodo(index: number) {
    const remove = this.todoList.splice(index, 1);
    this.deleteTodoWithHttp(remove[0]);
    this.saveToLocalStorage();
  }

  clearCompletedTodo() {
    const completedTodo = this.todoList.filter(todo => todo.isCompleted);
    completedTodo.forEach(todo => this.deleteTodoWithHttp(todo));
    this.todoList = this.todoList.filter(todo => !todo.isCompleted);

    this.saveToLocalStorage();
  }

  completedTodo() {
    this.todoList.forEach(todo => {
      todo.status = TodoStatus.Completed;
      this.updateTodoWithHttp(todo)
    });
    this.saveToLocalStorage()
  }




  // setting
  show(condition: string) {
    this.filterCondition = TodoStatus[condition];
  }

  // check 確認狀態
  //用get 在html就不需要加() = =...
  isShow(condition: string) {
    return this.filterCondition === TodoStatus[condition];
  }

  selectTodo(todo: Todo, input: HTMLInputElement) {
    todo.selected = true;
    input.value = todo.name;
    //修復dblclick後 無法馬上獲取焦點，因為foucs會先跑 template的input才出現，所以用setTimeout把foucs放到後面
    setTimeout(() => {
      input.focus();
    }, 0);
  }

  get leftTodo() {
    return this.todoList.filter(todo => !todo.isCompleted).length;
  }

}
