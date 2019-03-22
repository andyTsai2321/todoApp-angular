import { Injectable } from '@angular/core';

@Injectable()
export class StorageApiService {

  constructor() { }

  save(todoList){
    localStorage.setItem('todoList',JSON.stringify(todoList))
  }

}
