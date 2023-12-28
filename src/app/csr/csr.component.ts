import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { Todo } from '../interface/todo';

@Component({
  selector: 'app-csr',
  standalone: true,
  imports: [RouterLink],
  providers: [TodoService],
  templateUrl: './csr.component.html',
  styleUrl: './csr.component.scss'
})
export class CsrComponent {
  todoService = inject(TodoService);
  todo: Todo = {userId: 0, id: 0, title: '', completed: false};

  ngOnInit(): void {
    const id = 1;
    this.todoService.findOneTodo(id).subscribe((res) => {
      this.todo = res;
    })
  }
}
