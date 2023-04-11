import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/shared/models/Note';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes$: Observable<Note[]>;

  notes: Note[] = [];
  editState: boolean = false;
  noteToEdit: Note;

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.notes$ = this.notesService.getNotesByUserId(JSON.parse(currentUser).uid);
    } else {
      this.authService.getCurrentUser().then(user => {
        this.notes$ = this.notesService.getNotesByUserId(user.uid);
        this.authService.setCurrentUser(user);
      });
    }
  }
  

  deleteNote(event, note: Note){
    this.clearState();
    if(confirm('Biztosan törlöd a jegyzetet?')){
      this.notesService.deleteNote(note);
      
      alert('Törlés sikeres!');
    }
  }

  editNote(event, note: Note){
    this.editState = true;
    this.noteToEdit = note;
  }

  updateNote(note: Note){
    if(confirm('Biztosan módosítod a jegyzetet?')){
      this.notesService.updateNote(note);

      alert('Módosítás sikeres!');
    } else {
      location.reload();
    }
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.noteToEdit = null;
  }

  onClick(notesTitle: HTMLInputElement, notesText: HTMLTextAreaElement) {
    if (notesTitle.value && notesText.value) {
      this.notesService.addNote(notesTitle.value, notesText.value);
      notesTitle.value = "";
      notesText.value = "";
    }
  }

}
