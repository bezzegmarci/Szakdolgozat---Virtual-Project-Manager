import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/Event';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events$: Observable<Event[]>;

  minValue: Date;
  maxValue: Date;
  defaultValue: Date;

  events: Event[] = [];
  editState: boolean = false;
  eventToEdit: Event;


  constructor(private eventsService: EventService, private authService: AuthService) {


    const minValue = new Date();
    minValue.setHours(0);
    minValue.setMinutes(0);
    this.minValue = minValue;

    const maxValue = new Date();
    maxValue.setHours(23);
    maxValue.setMinutes(60);
    this.maxValue = maxValue;

   }

   ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.events$ = this.eventsService.getEventsByUserId(JSON.parse(currentUser).uid);
    } else {
      this.authService.getCurrentUser().then(user => {
        this.events$ = this.eventsService.getEventsByUserId(user.uid);
        this.authService.setCurrentUser(user);
      });
    }
  }

  deleteEvent(event, event_: Event){
    this.clearState();
    if(confirm('Biztosan törlöd az eseményt?')){
      this.eventsService.deleteEvent(event_);
      
      alert('Törlés sikeres!');
    }
  }

  editEvent(event, event_: Event){
    this.editState = true;
    this.eventToEdit = event_;
  }

  updateEvent(event: Event){
    if(confirm('Biztosan módosítod az eseményt?')){
      this.eventsService.updateEvent(event);

      alert('Módosítás sikeres!');
    } else {
      location.reload();
    }
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.eventToEdit = null;
  }

 
  onClick(notesTitle: HTMLInputElement, startDate: HTMLInputElement, startTime: HTMLInputElement, endDate: HTMLInputElement, endTime: HTMLInputElement, notesText: HTMLTextAreaElement) {
    if (notesTitle.value && startDate.value && startTime.value && endDate.value && endTime.value) {
      this.eventsService.addEvent(notesTitle.value, startDate.value, startTime.value, endDate.value, endTime.value, notesText.value);
      notesTitle.value = "";
      startDate.value = "";
      startTime.value = "";
      endDate.value = "";
      endTime.value = "";
      notesText.value = "";

      } else {
          alert("Valamelyik kötelező mezőt nem töltötte ki!");
      }
    
  }

}

