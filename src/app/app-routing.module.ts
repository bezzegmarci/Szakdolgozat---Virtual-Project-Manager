import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: 'main',
  loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
},
{ 
  path: 'signin', 
  loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule) 
}, 
{ 
  path: 'login', 
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
},
{
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
},
{
  path: 'todopage',
  loadChildren: () => import('./pages/to-do-page/to-do-page-routing.module').then(m => m.ToDoPageRoutingModule)
},
{
  path: 'event',
  loadChildren: () => import('./pages/event/event-routing.module').then(m => m.EventRoutingModule)
},
{
  path: 'notes',
  loadChildren: () => import('./pages/notes/notes-routing.module').then(m => m.NotesRoutingModule)
},
{
  path: '',
  redirectTo: '/main',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
