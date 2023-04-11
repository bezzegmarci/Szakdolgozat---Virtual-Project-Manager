import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Note } from '../models/Note';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteCollection: AngularFirestoreCollection<Note>;
  Notes: Observable<Note[]>;
  noteDoc: AngularFirestoreDocument<Note>;

  constructor(public afs: AngularFirestore, private authService: AuthService) { 
    
    this.noteCollection = this.afs.collection('Notes', ref => ref.orderBy('title','asc'));

    this.Notes = this.noteCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Note;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

   }

   getNotes(){
    return this.Notes;
  }

  getNotesByUserId(uid: string) {
    return this.afs.collection('Notes', ref => ref.where('userId', '==', uid)).valueChanges({ idField: 'id' });
  }

  async addNote(title: string, text: string){
    const user = await this.authService.getCurrentUser(); // Az éppen bejelentkezett felhasználó lekérése
    await this.noteCollection.add({
      title,
      text,
      userId: user.uid // Az éppen bejelentkezett felhasználó azonosítójának hozzáadása az adatbázisban tárolt jegyzetekhez
    })
  }

  deleteNote(note: Note){
    this.noteDoc = this.afs.doc(`Notes/${note.id}`);
    this.noteDoc.delete();
  }

  
  updateNote(note: Note){
    this.noteDoc = this.afs.doc(`Notes/${note.id}`);
    this.noteDoc.update(note);
  }


}