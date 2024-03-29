import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Todo } from '../models/Todo';
import { Observable, map } from 'rxjs';
import { Doing } from '../models/Doing';
import { Done } from '../models/Done';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoCollection: AngularFirestoreCollection<Todo>;
  Todos: Observable<Todo[]>;
  todoDoc: AngularFirestoreDocument<Todo>;

  doingCollection: AngularFirestoreCollection<Doing>;
  Doings: Observable<Doing[]>;
  doingDoc: AngularFirestoreDocument<Doing>;

  doneCollection: AngularFirestoreCollection<Done>;
  Dones: Observable<Done[]>;
  doneDoc: AngularFirestoreDocument<Done>;

  constructor(public afs: AngularFirestore, private authService: AuthService) { 

    this.todoCollection = this.afs.collection('Todos', ref => ref.orderBy('title','asc'));
    this.doingCollection = this.afs.collection('Doings', ref => ref.orderBy('title','asc'));
    this.doneCollection = this.afs.collection('Dones', ref => ref.orderBy('title','asc'));

    this.Todos = this.todoCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Todo;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.Doings = this.doingCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Doing;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.Dones = this.doneCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Done;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getTodos(){
    return this.Todos;
  }

  getDoings(){
    return this.Doings;
  }

  getDones(){
    return this.Dones;
  }

  async addTodo(title: string){
    const user = await this.authService.getCurrentUser(); // Az éppen bejelentkezett felhasználó lekérése
    await this.todoCollection.add({
      title,
      isDone : false,
      userId: user.uid // Az éppen bejelentkezett felhasználó azonosítójának hozzáadása az adatbázisban tárolt jegyzetekhez
    })
  }

  async addDoing(title: string){
    const user = await this.authService.getCurrentUser(); // Az éppen bejelentkezett felhasználó lekérése
    this.doingCollection.add({
      title,
      isDone : false,
      userId: user.uid // Az éppen bejelentkezett felhasználó azonosítójának hozzáadása az adatbázisban tárolt jegyzetekhez
    })
  }

  async addDone(title: string){
    const user = await this.authService.getCurrentUser(); // Az éppen bejelentkezett felhasználó lekérése
    this.doneCollection.add({
      title,
      isDone : false,
      userId: user.uid // Az éppen bejelentkezett felhasználó azonosítójának hozzáadása az adatbázisban tárolt jegyzetekhez
    })
  }

  getTodosByUserId(uid: string) {
    return this.afs.collection('Todos', ref => ref.where('userId', '==', uid)).valueChanges({ idField: 'id' });
  }

  getDoingsByUserId(uid: string) {
    return this.afs.collection('Doings', ref => ref.where('userId', '==', uid)).valueChanges({ idField: 'id' });
  }

  getDonesByUserId(uid: string) {
    return this.afs.collection('Dones', ref => ref.where('userId', '==', uid)).valueChanges({ idField: 'id' });
  }

  deleteTodo(todo: Todo){
    this.todoDoc = this.afs.doc(`Todos/${todo.id}`);
    this.todoDoc.delete();
  }

  deleteDoing(doing: Doing){
    this.doingDoc = this.afs.doc(`Doings/${doing.id}`);
    this.doingDoc.delete();
  }

  deleteDone(done: Done){
    this.doneDoc = this.afs.doc(`Dones/${done.id}`);
    this.doneDoc.delete();
  }

  updateTodo(todo: Todo){
    this.todoDoc = this.afs.doc(`Todos/${todo.id}`);
    this.todoDoc.update(todo);
    this.todoDoc.update({isDone:false});
  }

  updateDoing(doing: Doing){
    this.doingDoc = this.afs.doc(`Doings/${doing.id}`);
    this.doingDoc.update(doing);
    this.doingDoc.update({isDone:false});
  }

  updateDone(done: Done){
    this.doneDoc = this.afs.doc(`Dones/${done.id}`);
    this.doneDoc.update(done);
    this.doneDoc.update({isDone:false});
  }

  updateTodoStatus(todo:Todo, newStatus:boolean){
    this.todoDoc = this.afs.doc(`Todos/${todo.id}`);
    this.todoDoc.update({isDone:newStatus});
  }

  updateDoingStatus(doing:Doing, newStatus:boolean){
    this.doingDoc = this.afs.doc(`Doings/${doing.id}`);
    this.doingDoc.update({isDone:newStatus});
  }

}