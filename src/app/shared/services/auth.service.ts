import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
   }

  getCurrentUser(): Promise<firebase.User> {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
    return this.auth.currentUser;
  }

  setCurrentUser(user: firebase.User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(email: any, password: any) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signin(email: any, password: any) {
    this.user
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn2() {
    return this.auth.user;
  }

  isUserLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }


  logout() {
    localStorage.removeItem('currentUser');
    return this.auth.signOut();
  }

  
  async waitForAuthChange(): Promise<firebase.User | null> {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe(); // Azonnal leiratkozunk a listener-ről, hogy ne fusson többször
      resolve(user);
    });
  });
}

}
