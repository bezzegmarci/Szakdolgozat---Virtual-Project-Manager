import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToDoPageComponent } from './to-do-page.component';

const routes: Routes = [
  { path: '', component: ToDoPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoPageRoutingModule { }
