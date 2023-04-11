import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Doing } from 'src/app/shared/models/Doing';
import { Done } from 'src/app/shared/models/Done';
import { Todo } from 'src/app/shared/models/Todo';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TodoService } from 'src/app/shared/services/to-do-page.service';

@Component({
  selector: 'app-to-do-page',
  templateUrl: './to-do-page.component.html',
  styleUrls: ['./to-do-page.component.css']
})
export class ToDoPageComponent implements OnInit {

  todos$: Observable<Todo[]>;
  doings$: Observable<Doing[]>;
  dones$: Observable<Done[]>;

  todos: Todo[] = [];
  editState: boolean = false;
  todoToEdit: Todo;

  doings: Doing[] = [];
  editState2: boolean = false;
  doingToEdit: Doing;

  dones: Done[] = [];
  editState3: boolean = false;
  doneToEdit: Done;

  constructor(private todoService: TodoService, private authService: AuthService) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.todos$ = this.todoService.getTodosByUserId(JSON.parse(currentUser).uid);
    } else {
      this.authService.getCurrentUser().then(user => {
        this.todos$ = this.todoService.getTodosByUserId(user.uid);
        this.authService.setCurrentUser(user);
        console.log(this.todos$);
      });
    }

    if (currentUser) {
      this.doings$ = this.todoService.getDoingsByUserId(JSON.parse(currentUser).uid);
    } else {
      this.authService.getCurrentUser().then(user => {
        this.doings$ = this.todoService.getDoingsByUserId(user.uid);
        this.authService.setCurrentUser(user);
      });
    }

    if (currentUser) {
      this.dones$ = this.todoService.getDonesByUserId(JSON.parse(currentUser).uid);
    } else {
      this.authService.getCurrentUser().then(user => {
        this.dones$ = this.todoService.getDonesByUserId(user.uid);
        this.authService.setCurrentUser(user);
      });
    }

  }

  deleteTodo(event, todo: Todo){
    this.clearState();
    if(confirm('Biztosan törlöd a teendőt?')){
      this.todoService.deleteTodo(todo);
      
      alert('Törlés sikeres!');
    }
  }

  deleteDoing(event, doing: Doing){
    this.clearState2();
    if(confirm('Biztosan törlöd a teendőt?')){
      this.todoService.deleteDoing(doing);
      
      alert('Törlés sikeres!');
    }
  }

  deleteDone(event, done: Done){
    this.clearState3();
    if(confirm('Biztosan törlöd a teendőt?')){
      this.todoService.deleteDone(done);
      
      alert('Törlés sikeres!');
    }
  }

  editTodo(event, todo: Todo){
    this.editState = true;
    this.todoToEdit = todo;
  }

  editDoing(event, doing: Doing){
    this.editState2 = true;
    this.doingToEdit = doing;
  }

  editDone(event, done: Done){
    this.editState3 = true;
    this.doneToEdit = done;
  }

  updateTodo(todo: Todo){
    if(confirm('Biztosan módosítod a teendőt?')){
      this.todoService.updateTodo(todo);

      alert('Módosítás sikeres!');
    } else {
      location.reload();
    }
    this.clearState();
  }

  updateDoing(doing: Doing){
    if(confirm('Biztosan módosítod a teendőt?')){
      this.todoService.updateDoing(doing);
      
      alert('Módosítás sikeres!');
    } else {
      location.reload();
    }
    this.clearState2();
  }

  updateDone(done: Done){
    if(confirm('Biztosan módosítod a teendőt?')){
      this.todoService.updateDone(done);

      alert('Módosítás sikeres!');
    } else {
      location.reload();
    }
    this.clearState3();
  }

  clearState(){
    this.editState = false;
    this.todoToEdit = null;
  }

  clearState2(){
    this.editState2 = false;
    this.doingToEdit = null;
  }

  clearState3(){
    this.editState3 = false;
    this.doneToEdit = null;
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = "";
      console.log(this.todos$);
    }
  }

  onClick2(titleInput2: HTMLInputElement) {
    if (titleInput2.value) {
      this.todoService.addDoing(titleInput2.value);
      titleInput2.value = "";
    }
  }

  onClick3(titleInput3: HTMLInputElement) {
    if (titleInput3.value) {
      this.todoService.addDone(titleInput3.value);
      titleInput3.value = "";
    }
  }

  onStatusChange(todo: Todo, newStatus: boolean) {
    this.todoService.updateTodoStatus(todo, newStatus);
    this.todoService.addDoing(todo.title);
    this.todoService.deleteTodo(todo);
  }

  onStatusChange2(doing: Doing, newStatus: boolean) {
    this.todoService.updateDoingStatus(doing, newStatus);
    this.todoService.addDone(doing.title);
    this.todoService.deleteDoing(doing);
  }

}


