import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Note } from '../models/Note';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteCollection: AngularFirestoreCollection<Note>;
  Notes: Observable<Note[]>;
  noteDoc: AngularFirestoreDocument<Note>;

  constructor(public afs: AngularFirestore) { 
    
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

  addNote(title: string, text: string){
    this.noteCollection.add({
      title,
      text
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