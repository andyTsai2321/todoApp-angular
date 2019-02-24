import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatus } from './models';
import { generateId } from './mock';
import { p } from '@angular/core/src/render3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('todoList'));
    this.todoList = data.map(p => new Todo({id: p.id, name: p.name, status: p.status}))

  }

// 過濾條件
filterCondition: TodoStatus | undefined;

todoList: Todo[] = [

];

saveToLocalStorage(){
  localStorage.setItem('todoList',JSON.stringify(this.todoList))
}

creatNewTodo(input: HTMLInputElement) {
  this.todoList.push(new Todo({
    //確保id不重複
    id: Math.max(0, ...this.todoList.map(p => p.id)) +1,
    name: input.value,
    status: TodoStatus.Active
  }));
  input.value = '';
  this.saveToLocalStorage()
}

updateTodo(todo: Todo, editTodo: HTMLInputElement){
  todo.name = editTodo.value;
  todo.selected = false;
  this.saveToLocalStorage()
}

switchStatus(todo: Todo){
  todo.switchStatus();
  this.saveToLocalStorage()
}

delectTodo(idx:number){
  this.todoList.splice(idx, 1);
  this.saveToLocalStorage()
}

clearCompletedTodo(){
  this.todoList = this.todoList.filter(todo => !todo.isCompleted);
  this.saveToLocalStorage()
}

completedTodo(){
  this.todoList.forEach(todo => todo.status = TodoStatus.Completed);
  this.saveToLocalStorage()
}




 // setting
 show(condition: string){
  this.filterCondition = TodoStatus[condition];
 }

 // check 確認狀態
 //用get 在html就不需要加() = =...
isShow(condition: string){
  return this.filterCondition === TodoStatus[condition];
}

selectTodo(todo:Todo, input:HTMLInputElement){
  todo.selected = true;
  input.value = todo.name;
  //修復dblclick後 無法馬上獲取焦點，因為foucs會先跑 template的input才出現，所以用setTimeout把foucs放到後面
  setTimeout(() => {
    input.focus();
  }, 0);
}

get leftTodo(){
  return this.todoList.filter(todo => !todo.isCompleted).length;
}

}
