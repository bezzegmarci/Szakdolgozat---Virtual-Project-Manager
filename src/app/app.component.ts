import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'szakdolgozat';
  page = 'main';

  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}
