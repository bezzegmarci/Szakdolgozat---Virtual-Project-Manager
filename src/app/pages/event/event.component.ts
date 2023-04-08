import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})


export class EventComponent implements OnInit {

  minValue: Date;
  maxValue: Date;
  defaultValue: Date;

  events: Event[];
  editState: boolean = false;
  eventToEdit: Event;


  constructor(private eventsService: EventService) {


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
    this.eventsService.getEvents().subscribe(events => {
      //console.log(events);
      this.events = events;
    });
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

