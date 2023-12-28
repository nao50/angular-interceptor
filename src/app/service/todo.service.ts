import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interface/todo';
import { CACHING_ENABLED } from '../interceptor/cache.interceptor';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  #http = inject(HttpClient);

  findOneTodo(id: number): Observable<Todo> {
    return this.#http.get<Todo>('https://jsonplaceholder.typicode.com/todos/' + `${id}`, {
      context: new HttpContext().set(CACHING_ENABLED, true),
    })
  }
}
