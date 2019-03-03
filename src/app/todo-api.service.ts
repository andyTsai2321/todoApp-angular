import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Todo } from './models/todo';

@Injectable()
export class TodoApiService {

  constructor(@Inject('api') private api: string, private http: Http) { }
      get(){
        return this.http.get(`${this.api}/todos/`)
      }
      add(todo: Todo){
        this.http.post(`${this.api}/todos/`, todo).subscribe();
      }
}
