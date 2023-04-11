import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

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
  loadChildren: () => import('./pages/to-do-page/to-do-page-routing.module').then(m => m.ToDoPageRoutingModule),
  canActivate: [AuthGuard]
},
{
  path: 'event',
  loadChildren: () => import('./pages/event/event-routing.module').then(m => m.EventRoutingModule),
  canActivate: [AuthGuard]
},
{
  path: 'notes',
  loadChildren: () => import('./pages/notes/notes-routing.module').then(m => m.NotesRoutingModule),
  canActivate: [AuthGuard]
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

export class AppRoutingModule {
  
}



