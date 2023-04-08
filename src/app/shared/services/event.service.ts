import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Observable, map } from 'rxjs';
import { Event } from '../models/Event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventCollection: AngularFirestoreCollection<Event>;
  Events: Observable<Event[]>;
  eventDoc: AngularFirestoreDocument<Event>;

  constructor(public afs: AngularFirestore) { 
    
    this.eventCollection = this.afs.collection('Events', ref => ref.orderBy('title','asc'));

    this.Events = this.eventCollection.snapshotChanges().pipe(
      map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Event;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

   }

  getEvents(){
    return this.Events;
  }

  addEvent(title: string, startDate: string, startTime: string, endDate: string, endTime: string, text: string){
    this.eventCollection.add({
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      text
    })
  }

  deleteEvent(event: Event){
    this.eventDoc = this.afs.doc(`Events/${event.id}`);
    this.eventDoc.delete();
  }

  
  updateEvent(event: Event){
    this.eventDoc = this.afs.doc(`Events/${event.id}`);
    this.eventDoc.update(event);
  }


}